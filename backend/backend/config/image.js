const mongoose = require('mongoose');
const multer = require('multer');
const { GridFSBucket } = require('mongodb');
const connectDB = require('./db');

let bucket;

const connectAndInitBucket = async () => {
  const connection = await connectDB();
  if (!connection || !connection.connection) {
    throw new Error('Failed to connect to MongoDB.');
  }
  bucket = new mongoose.mongo.GridFSBucket(connection.connection.db, {
    bucketName: 'images',
  });
};

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/bmp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload an image file.'), false);
  }
};

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter,
});

const getBucket = () => {
  if (!bucket) {
    throw new Error('GridFS bucket not initialized. Make sure to connect first.');
  }
  return bucket;
};

const uploadToGridFS = async (file, filename) => {
  if (!bucket) {
    throw new Error('GridFS bucket not initialized. Make sure to connect first.');
  }
  const uploadStream = bucket.openUploadStream(filename);
  uploadStream.end(file.buffer);
  return new Promise((resolve, reject) => {
    uploadStream.on('finish', (file) => {
      resolve(file);
    });
    uploadStream.on('error', (error) => {
      reject(error);
    });
  });
};

module.exports = { connectAndInitBucket, upload, uploadToGridFS, getBucket };
