const sharp = require('sharp');
const fs = require('fs')
const path = require('path');


let inputFile  = "image-3.png";
let outputFile = "image-4.png";

fs.readFile(path.resolve(__dirname, inputFile), (err, data) => {
    if (err) throw err;
    console.log(data);
  });


sharp(path.resolve(__dirname, inputFile)).resize({ height: 200, width: 200 }).toFile(path.resolve(__dirname, outputFile))
    .then(function(newFileInfo) {
        console.log('Success');
    })
    .catch(function(err) {
        console.log(err);
    });