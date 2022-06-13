const router = require("express").Router();
const { Expense, User } = require("../../models");
const withAuth = require('../../utils/auth')

router.get("/", (req, res) => {
    Expense.findAll({
        order: [["created_at", "DESC"]],
        include: [
            {
              model: User,
              attributes: ["id", "username"],
            },
        ], 
    })
        .then(dbExpenseData => res.json(dbExpenseData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
})

router.get("/:id", (req, res) => {
    Expense.findOne({
        where: {
        id: req.params.id,
        },
    }).then((dbExpenseData) => {
        if (!dbExpenseData) {
            res
            .status(404)
            .json({ message: "Expense not found" });
            return;
        }
        res.json(dbExpenseData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post("/", withAuth, (req, res) => {
    Expense.create({
      expense_name: req.body.expense_name,
      expense_type: req.body.expense_type,
      expense_amount: req.body.expense_amount,
      expense_frequency: req.body.expense_frequency,
      user_id: req.body.user_id
    })
      .then((dbExpenseData) => res.json(dbExpenseData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

router.put('/:id', withAuth, (req, res) => {
    Expense.update(
        {
            expense_name: req.body.expense_name,
            expense_amount: req.body.expense_amount,
            expense_type: req.body.expense_type,
            expense_frequency: req.body.expense_frequency
        },
        {
            where: {
                id: req.params.id,
            },
        }
    ).then((dbExpenseData) => {
    if (!dbExpenseData) {
      res.status(404).json({ message: "Expense not found" });
      return;
    }
    res.json(dbExpenseData);
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
})

router.delete('/:id', withAuth, (req, res) => {
    Expense.destroy(
        {
            where: {
                id: req.params.id
            }
        }
    ).then(dbExpenseData => {
        if (!dbExpenseData) {
            res.status(404).json({ message: "Expense not found" });
            return;
          }
          res.json(dbExpenseData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

module.exports = router;