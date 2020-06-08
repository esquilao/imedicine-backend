const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
 
const storage = (folder) => ({storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..' , '..', 'uploads', folder),
    filename: (req, file, callback) => {
        const hash =  crypto.randomBytes(4).toString('HEX')
        const filename = `${hash}.${file.mimetype
        .split('/')[1]}`;

        callback(null, filename);
    }
})}) 

module.exports = storage;

