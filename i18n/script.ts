import path from 'path';

const fs = require('fs');

const translations = require('./translations.json');
const pageTranslationKeys = require('./page-keys.json');

const supportedLanguages = ['ru', 'en', 'ar'];

for (const pageName in pageTranslationKeys) {
    const translationKeys = pageTranslationKeys[pageName] as string[];
    const translationsForPage: Record<string, Record<string, string>> = {};

    supportedLanguages.forEach(lang => {
        translationsForPage[lang] = {};
        translationKeys.forEach(key => {
            translationsForPage[lang][key] = translations[key][lang];
        });
    });

    const folderPath = `./src/pages/${pageName}/locale`;
    try {
        fs.rmSync(folderPath, { recursive: true });
    } catch (e) {}
    fs.mkdirSync(folderPath);
    supportedLanguages.forEach(lang => {
        const filePath = path.join(folderPath, `${lang}.json`);
        const data = JSON.stringify(translationsForPage[lang], null, 2);
        fs.writeFileSync(filePath, data);
        console.log(`Created file: ${filePath}`);
    });
}
