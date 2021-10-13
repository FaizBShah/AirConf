const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // For Heroku redirection to secured layer connection in production
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
      res.redirect(`https://${req.header('host')}${req.url}`);
    }
    else {
      next();
    }
  });

  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));