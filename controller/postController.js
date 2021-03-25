const { post } = require('../models') 

const getPosts = async(req,res)=>{
    try {
        const Posts = await post.findAll();
        return res.json(Posts);
    } 
    catch (err) {
        const msg = "NO POSTS YET";
        return res.status(500).json(ret); 
    }
}

const createPost = async(req,res)=>{
    try {
        const user_id = req.params.id;
        const content = req.body.content;
        const Post = await post.create({ user_id,content })
        return res.json(Post);
    } 
    catch (err) {
        const msg = "Some errors happened";
        return res.status(500).json(ret);
    }
}

const getAnPost = async(req,res)=>{
    try {
        const post_id = req.params.id;
        const Post = await post.findById(post_id);
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
        const ret = "Post not found";
        return res.status(500).json(msg);
    }
}

const updatePost = async (req, res) => {
    const post_id = req.params.post_id
    console.log(req.body)
    console.log("=================")
    const { new_id, new_content} = req.body
    try {
      const post = await models.post.findOne({ where: { post_id } })
      post.post_id = new_id
      post.content = new_content
      await post.save()
      return res.json(post)
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