const express = require("express");

const db = require("./userDb.js");

const router = express.Router();

router.post("/", (req, res) => {
  res.status(500).json({ message: "not yet implemented" });
});

router.post("/:id/posts", (req, res) => {
  res.status(500).json({ message: "not yet implemented" });
});

router.get("/", (req, res) => {
  res.status(500).json({ message: "not yet implemented" });
});

router.get("/:user_id", validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

router.get("/:user_id/posts", (req, res) => {
  res.status(500).json({ message: "not yet implemented" });
});

router.delete("/:user_id", (req, res) => {
  res.status(500).json({ message: "not yet implemented" });
});

router.put("/:user_id", (req, res) => {
  res.status(500).json({ message: "not yet implemented" });
});

//custom middleware

function validateUserId(req, res, next) {
  db.getById(req.params.user_id)
    .then((user) => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(404).json({ error: "No user with the specified id" });
      }
    })
    .catch((err) => {
      console.log(
        `[${new Date().toISOString()}] error retrieving user from db: ${err}`
      );
      res.status(500).json({ error: "Failed to retrieve user data" });
    });
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
