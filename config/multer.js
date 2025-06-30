// config/multer.js
import multer from 'multer';
import path from 'path';
import secrets from './secrets.js';

// Convert max size to bytes
const MAX_SIZE = secrets.uploads.maxFileSizeMB * 1024 * 1024;

// Define storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, secrets.uploads.dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  },
});

// Optional: Restrict file types (example: images only)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const mimeMatches = allowedTypes.test(file.mimetype);
  const extMatches = allowedTypes.test(path.extname(file.originalname).toLowerCase());

  if (mimeMatches && extMatches) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

// Create the upload middleware
const upload = multer({
  storage,
  limits: { fileSize: MAX_SIZE },
  fileFilter,
});

export default upload;
