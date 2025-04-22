
const express = require("express")
const router = express.Router()
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const generateIdenticon = require("../utils/generateIdenticon");


// 新規ユーザー
router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    const defaultIconImg = generateIdenticon(email)

    // パスワードをランダムで10回適当な文字に入れ替える
    const hashedPassword = await bcrypt.hash(password,10)
    const user = await prisma.user.create({
        data: {
            username,
            email,
            password: hashedPassword,
            profile:{
                create:{
                    bio:"hello",
                    profileImageUrl:defaultIconImg ,
                }
            }
        },
        include:{
            profile:true
        }
    });
    return res.json({ user });
});

//jsonwebtoken（JWT）：ログイン後にトークンを発行する。
// ユーザーログイン
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
    // jwt.sign(payload, secretOrPrivateKey, options)
    const token = jwt.sign({id:user.id},process.env.SECRET_KEY ,{
        expiresIn:"1d", 
    })

    // 受け取り(login.tsx)ではresponse.data.tokenとして受け取っている
    return res.json({"token":token})
})


// （APIのルール集）を module.exports = router で外に出してる。
module.exports = router