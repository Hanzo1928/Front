import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const PORT = process.env.PORT || 3000;
const BACKUP_FILE_PATH = process.env.BACKUP_FILE_PATH || './backup.txt';
const IMAGE_DIR = './images';

const movies = new Map();

// Create the images directory if it doesn't exist
if (!fs.existsSync(IMAGE_DIR)) {
    fs.mkdirSync(IMAGE_DIR);
}

// Read and parse the backup file
fs.readFile(BACKUP_FILE_PATH, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading backup file:', err);
        process.exit(1);
    }

    const lines = data.split('\n');
    for (const line of lines) {
        if (line.trim() === '') continue;

        const movie = JSON.parse(line);
        movies.set(movie.id, movie);

        const imgPath = path.join(IMAGE_DIR, `${movie.id}.jpeg`);
        const imgData = movie.img.replace(/^data:image\/jpeg;base64,/, '');
        fs.writeFileSync(imgPath, imgData, 'base64');
    }
});

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    if (pathname === '/ping') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('pong');
        return;
    }

    if (pathname === '/echo' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(body);
        });
        return;
    }

    if (pathname.startsWith('/api/v1/movie/')) {
        const movieId = pathname.split('/').pop();
        const movie = movies.get(movieId);

        if (movie) {
            const filmCard = {
                id: movie.id,
                title: movie.title,
                description: movie.description,
                genre: movie.genre,
                release_year: movie.release_year,
            };
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(filmCard));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Movie not found' }));
        }
        return;
    }

    if (pathname.startsWith('/api/v1/search')) {
        const titleQuery = parsedUrl.query.title || '';
        const page = parseInt(parsedUrl.query.page, 10) || 1;
        const pageSize = 10;

        const searchResults = [];
        for (const movie of movies.values()) {
            if (movie.title.toLowerCase().includes(titleQuery.toLowerCase())) {
                searchResults.push({
                    id: movie.id,
                    title: movie.title,
                    description: movie.description,
                    genre: movie.genre,
                    release_year: movie.release_year,
                });
            }
        }

        const paginatedResults = searchResults.slice((page - 1) * pageSize, page * pageSize);

        const response = {
            search_result: paginatedResults,
        };

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(response));
        return;
    }

    if (pathname.startsWith('/static/images/')) {
        const movieId = pathname.split('/').pop().replace('.jpeg', '');
        const imgPath = path.join(IMAGE_DIR, `${movieId}.jpeg`);

        fs.readFile(imgPath, (err, imgData) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Image not found' }));
            } else {
                res.writeHead(200, { 'Content-Type': 'image/jpeg' });
                res.end(imgData);
            }
        });
        return;
    }

    // If no route is matched, return 404
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});