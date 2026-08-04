import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dirs = [
    path.join(__dirname, '..', 'content', 'posts'),
    path.join(__dirname, '..', 'content', 'talks')
];

function toSentenceCase(text) {
    if (!text) return text;
    // Lowercase everything first, then uppercase the first letter
    let newText = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    
    // Also capitalize after colon and space ": "
    newText = newText.replace(/:\s+([a-zа-я])/g, (match, p1) => {
        return ": " + p1.toUpperCase();
    });

    return newText;
}

for (const dir of dirs) {
    if (!fs.existsSync(dir)) continue;
    
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.md') && f !== '_index.md');
    
    for (const file of files) {
        const filePath = path.join(dir, file);
        let content = fs.readFileSync(filePath, 'utf-8');
        let modified = false;

        // Fix title in frontmatter
        content = content.replace(/^title\s*=\s*"(.*)"/m, (match, title) => {
            const newTitle = toSentenceCase(title);
            if (title !== newTitle) modified = true;
            return `title = "${newTitle}"`;
        });

        // Fix markdown headers (## Header, ### Header, etc.)
        content = content.replace(/^(#+)\s+(.+)$/gm, (match, hashes, headerText) => {
            const newHeader = toSentenceCase(headerText);
            if (headerText !== newHeader) modified = true;
            return `${hashes} ${newHeader}`;
        });

        if (modified) {
            fs.writeFileSync(filePath, content, 'utf-8');
            console.log(`Updated: ${file}`);
        }
    }
}

console.log("Barcha sarlavhalar tuzatildi!");
