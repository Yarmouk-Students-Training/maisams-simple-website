const fs = require('fs');

// reading files 
// fs.readFile('./docs/text.txt', (err,data) =>{

   // if(err){
     //   console.log(err);

//    }
  //  console.log(data.toString());
//});

// console.log('last line');


//writing files 

//fs.writeFile('./docs/test.txt','hello, world',() =>
//{
  //  console.log('files was written');
//});

//fs.writeFile('./docs/test.txt','hello, again',() =>
//{
  //  console.log('files was written');
//});


//directories
if(!fs.existsSync('./assets')){


fs.mkdir('./assets', (err) => {
    if(err){
        console.log(err);
    }
    console.log('folder created');
});
} else {
    fs.rmdir('./essets',(err) => {
        if(err){
            console.log(err);

        }
        console.log('folder deleted');
    })

}

//deleting files

if(fs.existsSync('./docs/deleteme.txt')){
    fs.unlink('./docs/deleteme.txt', (err) => {
        if(err){
            console.log(err);
        }
        console.log('file deleted');
    })
}