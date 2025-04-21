const express = require("express");
const router = express.Router();
const { use } = require("react");
const { PrismaClient } = require("../generated/prisma");
const isAuthenticated = require("../middlewares/isAuthenticated");
const prisma = new PrismaClient();

router.get("/find", isAuthenticated, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.userId,
      },
    });

    if (!user) {
      res.status(401).json({ error: "ユーザーが見つかりませんでした" });
    }

    res.status(200).json({
      user: { id: user.id, email: user.email, username: user.username },
    });
  } catch (error) {
    res.status(501).json({ error: error.message });
  }
});

module.exports = router;
