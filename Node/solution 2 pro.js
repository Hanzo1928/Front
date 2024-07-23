import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';
import readline from 'node:readline';

const PORT = process.env.PORT || 3000;
const BACKUP_FILE_PATH = process.env.BACKUP_FILE_PATH || './backup.txt';
const IMAGE_DIR = './images';

const movies = new Map();

// Create the images directory if it doesn't exist
if (!fs.existsSync(IMAGE_DIR)) {
    fs.mkdirSync(IMAGE_DIR);
}

// Read and parse the backup file incrementally
async function loadBackupFile() {
    const fileStream = fs.createReadStream(BACKUP_FILE_PATH);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });
    for await (const line of rl) {
        if (line.trim() === '') continue;

        const movie = JSON.parse(line);
        movies.set(movie.id, {
            id: movie.id,
            title: movie.title,
            description: movie.description,
            genre: movie.genre,
            release_year: movie.release_year,
        });

        const imgPath = path.join(IMAGE_DIR, `${movie.id}.jpeg`);
        const imgData = movie.img.replace(/^data:image\/jpeg;base64,/, '');
        fs.writeFile(imgPath, imgData, 'base64', (err) => {
            if (err) console.error(`Error writing image for movie ID ${movie.id}:`, err);
        });
    }
}

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
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(movie));
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
                searchResults.push(movie);
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

// Load the backup file before starting the server
loadBackupFile().then(() => {
    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Error loading backup file:', err);
    process.exit(1);
});
