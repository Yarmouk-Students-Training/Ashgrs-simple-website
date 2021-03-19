const User = require('../models/users');

const register_get = (req,res) =>{
    res.render('register' , {title:"Register"});
}

const register_get_err = (req,res) =>{
    res.render('registerError' , {title:"Register"});
}

const register_post = (req,res) =>{
    User.findOne({email:req.body.email}).then(user=>{
        if(user){
            res.redirect('/registerError');
        }
    })
    const user = new User(req.body);
    user.save()
        .then(()=>{
            res.redirect('/blogs')
        })
        .catch((err)=>{
            console.log(err);
        });
};

module.exports = {
    register_post,
    register_get_err,
    register_get
}