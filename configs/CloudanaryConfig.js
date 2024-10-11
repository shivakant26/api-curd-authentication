const cloudinary = require('cloudinary').v2;

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: 'djoeqifdy',
  api_key: '928877257269544',
  api_secret: 'e5Ph7DXI-BcPy3nBR-wDa6-7sCc',
});

module.exports = cloudinary;
