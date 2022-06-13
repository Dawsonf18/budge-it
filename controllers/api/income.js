const router = require("express").Router();
const { Income, User } = require("../../models");
const withAuth = require('../../utils/auth')

// Get income entries
router.get("/", (req, res) => {
  // Finds all the entries
  Income.findAll({
    // Orders the entries by the date they were created
    order: [["created_at", "DESC"]],
    // States which attributes are allowed to be pulled
    include: [
      {
        model: User,
        attributes: ["id", "username"],
      },
    ],
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Get income databse by id
router.get("/:id", (req, res) => {
  Income.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res
          .status(404)
          .json({ message: "No income entry found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Creates a income entry
router.post("/", withAuth, (req, res) => {
  Income.create({
    income_type: req.body.income_type,
    income_amount: req.body.income_amount,
    income_frequency: req.body.income_frequency,
    user_id: req.body.user_id,
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Edit income info
router.put("/:id", withAuth, (req, res) => {
    Income.update(
      {
        income_type: req.body.income_type,
        income_amount: req.body.income_amount,
        income_frequency: req.body.income_frequency
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then((dbPostData) => {
        if (!dbPostData) {
          res.status(404).json({ message: "No data found with this ID!" });
          return;
        }
        res.json(dbPostData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  })

// Delete a income entry
router.delete("/:id", withAuth, (req, res) => {
    Income.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((dbPostData) => {
        if (!dbPostData) {
          res.status(404).json({ message: "No Data found with this ID!" });
          return;
        }
        res.json(dbPostData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;