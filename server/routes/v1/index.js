const express = require('express');
const authenticationRoutes = require("./auth");
const protectedRoutes = require("./protected");

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'API is healthy!' });
});

// Mount authentication routes
router.use("/api/v1", [authenticationRoutes, protectedRoutes]);

module.exports = router;
