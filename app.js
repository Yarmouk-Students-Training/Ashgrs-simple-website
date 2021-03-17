// import 3rd party packages
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { result } = require('lodash');
const Blog = require('./models/blogs');

// creating app and connecting database
//81.253.108.82
const app = express();
const db_uri = 'mongodb+srv://ashgr:ashgr123@node-tutorial.0wsmi.mongodb.net/nodejs-pilot?retryWrites=true&w=majority';

mongoose.connect(db_uri , {useNewUrlParser:true , useUnifiedTopology:true})
    .then((result)=>{
        console.log("=== Database connected successfully ===");
        app.listen(3000);
    })
    .catch((err)=>console.log(err));

// setup view enging
app.set('view engine' , 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded());
app.use(morgan('dev'));


// express app pages

app.get('/' , (req, res) =>{
    res.redirect('/blogs');
});



app.post('/blogs' , (req,res)=>{
    // console.log(req.body);
    const blog = new Blog(req.body);
    blog.save()
        .then((result)=>{
            res.redirect('/blogs');
        })
        .catch((err)=>{
            console.log(err);
        });
});
app.get('/blogs/create' , (req, res) =>{
    res.render('create',{title : 'New Blog'});
});
app.get('/blogs/:id' , (req,res)=>{
    const id = req.params.id;
    Blog.findById(id)
        .then((result)=>{
            res.render('details',{blog:result , title : "Blog Detail"});
        })
        .catch((err) =>{
            console.log(err);
        });
});

app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;
    
    Blog.findByIdAndDelete(id)
      .then(result => {
        res.json({ redirect: '/blogs' });
      })
      .catch(err => {
        console.log(err);
      });
  });

app.get('/about' , (req, res) =>{
    res.render('about',{title : 'About'});
});

app.get('/blogs' , (req,res) =>{
    Blog.find()
        .then(result=>{
            res.render('index' , {title:"All Blogs" , blogs:result})
        })
        .catch(err =>{
            console.log(err);
        });
});



app.use((req,res) =>{
    res.status(404).render('404',{title : '404'});
});
