const { getBucket, uploadToGridFS } = require('../config/image');

const uploadImg = async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({ message: 'No file uploaded.' });
      return;
    }
    if (!req.body.imageID) {
      res.status(400).json({ message: 'No imageID provided.'});
      return;
    }
    const imageID = req.body.imageID;
    await uploadToGridFS(req.file, imageID);
    res.status(200).json({ message: 'File uploaded successfully', file: req.file });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const image = async (req, res) => {
  try {
    const bucket = getBucket();
    const filename = req.params.filename;
    const files = await bucket.find({ filename }).toArray();
    if (!files || files.length === 0) {
      return res.status(404).json({ message: 'File not found' });
    }
    const downloadStream = bucket.openDownloadStreamByName(filename);
    downloadStream.on('error', (err) => {
      res.status(500).json({ error: err.message });
    });
    downloadStream.pipe(res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { uploadImg, image };
