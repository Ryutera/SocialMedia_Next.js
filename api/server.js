const express = require("express");
const app = express();
const PORT = 5000;
const { PrismaClient } = require("../api/generated/prisma");
const prisma = new PrismaClient();
const bcryot = require("bcrypt")




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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
