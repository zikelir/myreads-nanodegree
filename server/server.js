const express = require('express');
const app = express();
const apiRouter = express.Router();
const path = require('path');
const apiRoutes = require('./routes/index.js');
const public = path.join(__dirname, '..', 'client', 'dist');

const port = process.env.PORT || 8080;
// app.use('/static', express.static(__dirname, 'dist'));

app.use(express.static(public));
app.use('/api', apiRoutes);

// app.use(express.static(path.resolve(__dirname, '..', 'client', 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(public + '/index.html'));
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


