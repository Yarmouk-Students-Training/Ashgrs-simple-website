const { post , tokens } = require('../models') 

function findToken(email){
    const user = tokens.findOne({where:{email}});
    if(user !== undefined){
        return true;
    }
    return false;
}

const getPosts = async(req,res)=>{
    try {
        const Posts = await post.findAll();
        return res.json(Posts);
    } 
    catch (err) {
        const msg = "NO POSTS YET";
        return res.status(500).json(msg); 
    }
}

const createPost = async(req,res)=>{
    const {userEmail , post_id , content} = req.body;
    console.log(req.body)
    if(findToken(userEmail) == false){
        const msg = "user didnt logged in !!";
        return res.status(500).json(msg);
    }
    try {
        await post.create({userEmail , post_id , content});
        return res.json("Post created successfully");
        // const Post = await post.create({ post_id,content,email })
        // return res.json(Post);
    } 
    catch (err) {
        const msg = "Some errors happened";
        console.log("==================")
        console.log(err)    
        return res.status(500).json(msg);
    }
}

const getAnPost = async(req,res)=>{
    try {
        const post_id = req.params.id;
        const Post = await post.findOne({where:{post_id}});
        return res.json(Post);
    } 
    catch ( err ) {
        const msg = "Couldn't find post.";
        return res.status(500).json(msg);
    }
}

const deletePost = async(req,res)=>{
    try {
        const post_id = req.params.id;
        await post.destroy({
            where : {
                post_id
            }
        });
        const msg = "Post deleted";
        return res.json(msg);
    } 
    catch (err) {
        const msg = "Post not found";
        return res.status(500).json(msg);
    }
}

const updatePost = async (req, res) => {
    const post_id = req.params.id
    console.log(req.body)
    console.log("=================")
    const { new_content} = req.body
    try {
      const Post = await post.findOne({ where: { post_id } })
      Post.content = new_content
      await Post.save()
      return res.json(Post)
    } 
    catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
}

module.exports = {
    getPosts,
    createPost,
    getAnPost,
    deletePost,
    updatePost
}