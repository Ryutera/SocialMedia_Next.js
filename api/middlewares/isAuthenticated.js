const jwt = require("jsonwebtoken")

function isAuthenticated (req,res,next){
    //bearerとtokenの内容を区切ってtokenの方だけ抽出
    const token=req.headers.authorization?.split(" ")[1]
    console.log(req.headers)
    if (!token) {
        return res.status(401).json({message:"権限がありません"})
    }

    //jwt.verify(token, secretKey, callback)
    jwt.verify(token,process.env.SECRET_KEY,(err,decoded) =>{
        if (err) {
            console.log(err)
            return res.status(401).json({message:"権限がありません"})
        }
        req.userId = decoded.id
         //チェックOKなので、次のルート処理に進ませる。
    next()
    })

}

module.exports = isAuthenticated