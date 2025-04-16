const express = require("express");
const router = require("./routers/auth");
const app = express();
const PORT = 5000;
require("dotenv").config()
const authRoute = require(".routers/auth")


app.use("/api/auth", authRoute)


//jsonデータを送る
app.use(express.json());




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
