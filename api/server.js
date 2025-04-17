const express = require("express");
const app = express();
const cors = require("cors")

const authRoute = require("./routers/auth")
require("dotenv").config()
const PORT = 5000;

// フロントとバックエンドのサーバーの行き来を可能にする
app.use(cors())
app.use(express.json());

app.use("/api/auth", authRoute)

//jsonデータを送る



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
