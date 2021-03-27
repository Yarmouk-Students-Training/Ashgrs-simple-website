const models = require('../models');
const { Op } = require("sequelize");

const makeFriendship = async (req,res)=>{
    const {relation , senderUserEmail , reciver} = req.body;
    try{
        const newRel = await models.friendship.create({ relation, senderUserEmail, reciver})
        return res.json(newRel)
    }
    catch(err){
        console.log(err)
        return res.status(500).json(err)
    }
}

const getFriends = async (req,res) =>{
    const user = req.body.user;
    try{
        const allFriends = await models.friendship.findAll({
            where:{
                [Op.or]: [
                    { senderUserEmail: user },
                    { reciver: user }
                  ]
            }
        })
        return res.json(allFriends);
    }
    catch(err){
        console.log(err)
        return res.status(500).json(err)
    }
}

const deleteFriendship = async (req,res) =>{
    const {firstUser , secondUser} = req.body;
    try{
        const allRel = await models.friendship.findAll({
            where:{
                [Op.or]: [
                    [Op.and]: [
                        { senderUserEmail: firstUser },
                        { reciver: secondUser }
                    ],
                    [Op.and]: 
                        { senderUserEmail: secondUser },
                        { reciver: firstUser }
                    ]
                  ]
            }
        })
        allRel.destroy();
        return res.json({ message: 'friendships deleted!' })
    }
    catch(err){
        console.log(err)
        return res.status(500).json(err)
    }
}

module.exports = {
    makeFriendship,
    getFriends,
    deleteFriendship
}

