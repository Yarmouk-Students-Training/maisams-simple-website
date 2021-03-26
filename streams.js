const fs = require('fs');

const readStream = fs.createWriteStream('./docs/text.txt', {encoding: 'utf8'});

const writeStream = fs.createWriteStream('./docs/blog4.txt');
//readStream.on('data',(chunk) => {
  //  console.log('..... NEW CHUNK .....');
    //console.log(chunk);
    //writeStream.write('\nNEW CHUNK\n ')
    //writeStream.write(chunk);
//});

//PIPING

readStream.pipe(writeStream);