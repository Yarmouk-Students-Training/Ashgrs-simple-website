const express = require('express');

const app = express();

app.set('view engine' , 'ejs');

app.listen(3000);

app.get('/' , (req, res) =>{
    const blogs = [
        {blogTitle : "How to become red coder?"  , content : "Blah Blah Blah Blah Blah Blah Blah "},
        {blogTitle : "How to become my friend?"  , content : "Blah Blah Blah Blah Blah Blah Blah "},
        {blogTitle : "How to become SDE in Home?"  , content : "Blah Blah Blah Blah Blah Blah Blah "}
    ]
    res.render('index',{title : 'Home' , blogs});
});


app.get('/about' , (req, res) =>{
    res.render('about',{title : 'About'});
});

app.get('/blogs/create' , (req, res) =>{
    res.render('create',{title : 'New Blog'});
});

app.use((req,res) =>{
    res.status(404).render('404',{title : '404'});
})