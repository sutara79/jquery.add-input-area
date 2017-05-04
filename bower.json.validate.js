var bowerJson = require('bower-json');

// Can also be used by simply calling bowerJson() 
bowerJson.read('bower.json', function (err, json) {
  if (err) {
    console.error('There was an error reading the file');
    console.error(err.message);
    return;
  }
  console.log('bower.json is valid');
});