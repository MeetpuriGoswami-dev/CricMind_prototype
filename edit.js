const fs = require('fs');

// Edit index.html
let html = fs.readFileSync('index.html', 'utf8').split('\n');
html.splice(1097, 243); // Lines 1098 to 1340
html.splice(377, 8); // Lines 378 to 385
fs.writeFileSync('index.html', html.join('\n'));

// Edit app.js
let js = fs.readFileSync('app.js', 'utf8').split('\n');
js.splice(315, 97); // Lines 316 to 412
fs.writeFileSync('app.js', js.join('\n'));

console.log('Files edited successfully.');
