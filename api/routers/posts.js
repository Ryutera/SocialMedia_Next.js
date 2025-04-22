const express = require("express")
const router = express.Router()
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();
const isAuthenticated = require("../middlewares/isAuthenticated");


// post api
router.post("/post", isAuthenticated, async (req, res) => {
    const { content } = req.body;

    if(!content){
        return res.status(400).json({message:"no post content"})
    }
   try {

    const newPost = await prisma.post.create({
        data:{
            content,
            authorId:req.userId, 
        },
        include:{
           author:{
            include:{
                profile:true
            }
           }
        }
        
    })
    
    // apiの呼び込み先に値を返却している、オブジェクトはそのまま送れないのでjsonで変換
    res.status(201).json(newPost)
   } catch (error) {
    console.log(error)
    res.status(500).json({message:"server error"})
   }
});

router.get("/get_latest_posts", async(req,res)=>{
    
    try {
        const posts = await prisma.post.findMany(
            {take:10,
            orderBy:{createdAt:"desc"},
            include:{
                author:{
                    include:{
                        profile:true
                    }
                }
            }
        }
            
        )
       res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({message:"server error"})
    }
})





module.exports = router