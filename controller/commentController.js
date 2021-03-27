const { comment , post } = require('../models') 

const commentCreate = async(req,res)=>{
    const {comment_id,post_id , body} = req.body;
    console.log("================")
    console.log(req.body)
    console.log("================")
    try {
        const Post = await post.findOne({where:{post_id}});
        console.log("================")
        const userEmail = Post.userEmail; 
        console.log(userEmail)
        console.log("================")
        const Comment= await comment.create({post_id,userEmail,comment_id  , body});
        return res.json(Comment)

    } 
    catch (err) {
        const msg = "Some errors happened";
        return res.status(500).json(msg);
    }
}

const postCommentsGet = async(req,res)=>{
    try {
        const post_id = req.params.id;
        const Comments = await comment.findAll({where:{post_id}});
        if(Comments.length == 0){
            return res.json("Couldn't find comment for this post")
        }
        return res.json(Comments);
    } 
    catch ( err ) {
        const msg = "Couldn't find comment for this post.";
        return res.status(500).json(msg);
    }
}

const commentDelete = async(req,res)=>{
    try {
        const comment_id = req.params.id;
        await comment.destroy({
            where : {
                comment_id
            }
        });
        const msg = "Comment deleted";
        return res.json(msg);
    } 
    catch (err) {
        const msg = "Comment not found";
        return res.status(500).json(msg);
    }
}

module.exports = {
    commentCreate,
    postCommentsGet,
    commentDelete,
}