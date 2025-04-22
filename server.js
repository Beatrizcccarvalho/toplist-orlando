const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the 'deploy' directory
app.use(express.static(path.join(__dirname, 'deploy')));

// All routes should serve index.html to support client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'deploy', 'index.html'));
});

// Always use port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 