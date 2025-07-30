const fs = require('fs');
const path = require('path');

// Create public directory if it doesn't exist
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
}

// Copy build files from client/build to public
const buildDir = path.join(__dirname, 'client', 'build');
const copyRecursive = (src, dest) => {
    if (fs.statSync(src).isDirectory()) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }
        fs.readdirSync(src).forEach(file => {
            copyRecursive(path.join(src, file), path.join(dest, file));
        });
    } else {
        fs.copyFileSync(src, dest);
    }
};

if (fs.existsSync(buildDir)) {
    copyRecursive(buildDir, publicDir);
    console.log('Build files copied to public directory successfully!');
} else {
    console.error('Build directory not found!');
    process.exit(1);
} 