const User = require('../models/users');

const register_get = (req,res) =>{
    res.render('register' , {title:"Register" , err_msg :null});
}

const register_get_err = (req,res) =>{
    res.render('registerError' , {title:"Register"});
}

const register_post = (req,res) =>{
    User.findOne({email:req.body.email}).then(user=>{
        if(user){
            res.render('register' , {title:"Register" , err_msg :"Email is already used"});
        }
    })
    const user = new User(req.body);
    if(req.body.pass != req.body.rePass){
        res.render('register' , {title:"Register" , err_msg :"Password not match"});
    }
    user.save()
        .then(()=>{
            res.render('register' , {title:"Register" , err_msg :"Registered successfully"});
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