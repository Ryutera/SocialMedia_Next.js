const express = require("express");
const app = express();
const PORT = 5000;
const { PrismaClient } = require("../api/generated/prisma");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()


//jsonデータを送る
app.use(express.json());


// 新規ユーザー
app.post("/api/auth/register", async (req, res) => {
    const { username, email, password } = req.body;

    // パスワードをランダムで10回適当な文字に入れ替える
    const hashedPassword = await bcryot.hash(password,10)
    const user = await prisma.user.create({
        data: {
            username,
            email,
            password: hashedPassword,
        }
    });
    return res.json({ user });
});

//jsonwebtoken（JWT）：ログイン後にトークンを発行する。
// ユーザーログイン
app.post("/api/auth/login", async(req,res)=>{
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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
