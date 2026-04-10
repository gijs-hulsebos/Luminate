const fs = require('fs');
const data = JSON.parse(fs.readFileSync('/app/applet/EntireBible-DR.json'));
const books = Object.keys(data);
console.log('Total books:', books.length);
console.log('Missing Matthew?', !books.includes('Matthew'));
console.log('Books:', books.join(', '));
