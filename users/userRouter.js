const express = require("express");

const db = require("./userDb.js");

const router = express.Router();

router.post("/", validateUser, (req, res) => {
  db.insert(req.body)
    .then((new_user) => {
      res.status(201).json(new_user);
    })
    .catch((err) => {
      console.log(
        `[${new Date().toISOString()}] error inserting user into db: ${err}`
      );
      res.status(500).json({ error: "Failed to add user to database" });
    });
});

router.post("/:id/posts", (req, res) => {
  res.status(500).json({ message: "not yet implemented" });
});

router.get("/", (req, res) => {
  db.get()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      console.log(
        `[${new Date().toISOString()}] error retrieving user data: ${err}`
      );
      res.status(500).json({ error: "Failed to retrieve user data" });
    });
});

router.get("/:user_id", validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

router.get("/:user_id/posts", validateUserId, (req, res) => {
  db.getUserPosts(req.user.id)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      console.log(
        `[${new Date().toISOString()}] error retrieving user's post data: ${err}`
      );
      res.status(500).json({ error: "Failed to retrieve user's post data" });
    });
});

router.delete("/:user_id", validateUserId, (req, res) => {
  db.remove(req.user.id)
    .then((posts) => {
      res.status(200).json(req.user);
    })
    .catch((err) => {
      console.log(
        `[${new Date().toISOString()}] error deleting user: ${err}`
      );
      res.status(500).json({ error: "Failed to delete user" });
    });
});

router.put("/:user_id", validateUser, validateUserId, (req, res) => {
  db.update(req.user.id, req.body)
    .then((_records_updated) => {
      db.getById(req.user.id)
        .then((updated_user) => {
          if (updated_user) {
            res.status(200).json(updated_user);
          } else {
            res.status(500).json({ error: "Failed to get updated user" });
          }
        })
        .catch((err) => {
          console.log(
            `[${new Date().toISOString()}] error retrieving updated user from db: ${err}`
          );
          res.status(500).json({ error: "Failed to retrieve user data" });
        });
    })
    .catch((err) => {
      console.log(
        `[${new Date().toISOString()}] error inserting user into db: ${err}`
      );
      res.status(500).json({ error: "Failed to add user to database" });
    });
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
  if (req.body) {
    if (req.body.name) {
      next();
    } else {
      res.status(400).json({ error: "missing required field: 'name'" });
    }
  } else {
    res.status(400).json({ error: "missing user data" });
  }
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
