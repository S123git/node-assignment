const express = require('express');
const app = express();
 
var router = express.Router();              
router.get('/', function(req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    var http = require('https');
    // API Call 
    http.get('https://jsonplaceholder.typicode.com/users', (response) => {
      response.setEncoding('utf8');
        let rawData = '';
        response.on('data', (chunk) => { rawData += chunk; });
        response.on('end', () => {
          try {
            const parsedData = JSON.parse(rawData);
            res.json({parsedData});
          } catch (e) {
            console.error(e.message);
          }
        });
    }).on('error', (e) => {
      console.error(`Got error: ${e.message}`);
    });;
});

app.use('/api', router);
 
// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});