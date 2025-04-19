const express = require("express")
const router = express.Router()
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


// post api
router.post("/post", async (req, res) => {
    const { content } = req.body;

    if(!content){
        return res.status(400).json({message:"no post content"})
    }
   try {

    const newPost = await prisma.post.create({
        data:{
            content,
            authorId:1
        }
    })
    
    res.status(201).json(newPost)
   } catch (error) {
    console.log(error)
    res.status(500).json({message:"server error"})
   }
});



router.post("/login", async(req,res)=>{
    const {email, password
    } = req.body
    const user = await prisma.user.findUnique({where:{email}})

    if (!user) {
        return res.status(401).json({error:"email or password is wrong"})
        
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.status(402).json({error:"wrong password"}

        )
        
    }

    const token = jwt.sign({id:user.id},process.env.SECRET_KEY ,{
        expiresIn:"1d", 
    })

    return res.json({"token":token})
})

module.exports = router