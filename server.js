const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Redirect microshop.info to www.microshopnet.net
app.use((req, res, next) => {
  const host = req.hostname;
  if (host === 'microshop.info' || host === 'www.microshop.info') {
    return res.redirect(301, 'https://www.microshopnet.net' + req.originalUrl);
  }
  next();
});

// Serve static files from the project root
app.use(express.static(path.join(__dirname), {
  index: 'index.html',
  extensions: ['html']
}));

// Fallback to index
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`MicroShop web running on port ${PORT}`);
});
