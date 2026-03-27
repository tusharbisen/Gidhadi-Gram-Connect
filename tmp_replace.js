const fs = require('fs');
const path = require('path');

function replaceTokens(content) {
  return content
    .replace(/(from|via|to)-emerald-50\b/g, '$1-primary/5')
    .replace(/(from|via|to)-emerald-100\b/g, '$1-primary/10')
    .replace(/(from|via|to)-emerald-200\b/g, '$1-primary/20')
    .replace(/(from|via|to)-emerald-300\b/g, '$1-primary/40')
    .replace(/(from|via|to)-emerald-[456789]00\b/g, '$1-primary')
    .replace(/(from|via|to)-emerald-950\b/g, '$1-primary');
}

function processDir(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let newContent = replaceTokens(content);
      if (content !== newContent) {
        fs.writeFileSync(fullPath, newContent);
      }
    }
  }
}

processDir(path.join(__dirname, 'components'));
processDir(path.join(__dirname, 'app'));
console.log('Cleaned up remaining emerald gradient stops.');
