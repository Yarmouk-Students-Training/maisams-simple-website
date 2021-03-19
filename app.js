const express = require('express');
const morgan = require('morgan');
const mangoose = require('mongoose');
//const Blog = require('./models/blog');
//const { render } = require('ejs');
const blogRoutes = require('./routes/blogRoutes');


//express app
const app = express();

//connect to mongodb

const dbURI = 'mongodb://maisam:0000mk@nodetuts-shard-00-00.syebv.mongodb.net:27017,nodetuts-shard-00-01.syebv.mongodb.net:27017,nodetuts-shard-00-02.syebv.mongodb.net:27017/node-tuts?ssl=true&replicaSet=atlas-cqcne2-shard-0&authSource=admin&retryWrites=true&w=majority';
mangoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
   .then((result) => {app.listen(3000);   
    console.log("Connected")})
   .catch((err) => console.log(err));
   

//listen for requests
//app.listen(3000);   

//register view engine
app.set('view engine', 'ejs');


//middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

//app.use((req, res, next) => {
   //  console.log('new request made:');
  //  console.log('host: ', req.hostname);
 //  console.log('path: ', req.path);
//  console.log('method: ', req.method);//    next();
//});

//mongoose and mongo sandbox routes

app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'new blog',
        snippet: 'about my new blog',
        body: 'more about my new blog '
    });

    blog.save()
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        console.log(err);
    });
});
app.get('/all-blogs', (req, res) => {
    Blog.find()
      .then((result) => {
          res.send(result);          
      })
      .catch((err) => {
          console.log(err);
      });
});

app.get('/single-blog', (req, res) => {
    Blog.findById('Seb415667fcf2d6448fcl62a')
      .then((result) => {
          res.send(result)
      })
      .catch((err) => {
          console.log(err);
      });
});
//routes
app.get('/', (req, res) => {
    res.render('about', {title: 'About' });
   // const blogs = [
     //   {title: 'Marah frind eggs', snippet: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '},
       // {title: 'Maisam frind stars', snippet: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '},
        //{title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '},

    //];

   // res.send('<p>Home Page</p>');
   //res.sendFile('./views/index.html', {root:__dirname});
   res.render('index', { title: 'Home', blogs });

});

// app.use((req, res, next) => {
   // console.log('in the next middleware');    
  //   next();
// }); 

app.get('/about', (req, res) => {

   // res.send('<p>About Page</p>');
   //res.sendFile('./views/about.html', {root:__dirname});
   res.render('about', { title: 'About' });
 
});

//blog routes

app.use('/blogs',blogRoutes);

//404 page
app.use((req, res) => {
    //res.status(404).sendFile('./views/404.html', {root:__dirname});
    res.status(404).render('404', { title: '404' });

});