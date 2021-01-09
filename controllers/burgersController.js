const express = require("express");

const router = express.Router();

// Import the model (burger.js) to use its database functions.
const burger = require("../models/burger.js");

// Creating routes //
router.get("/", (req, res) => {
    burger.all((data) => {
        const viewData = {
            burgers: data
        };
        console.log(viewData);
        res.render("index", viewData);
    });
});
// Send back the ID of the new burger //
router.post("/api/burgers", (req, res) => {
    burger.create(["name", "eaten"], [req.body.name, req.body.eaten], (result) => {
        
        res.json({ id: result.insertId });
    });
});

router.put("/api/burgers/:id", (req, res) => {

    const condition = { id: req.params.id };

    console.log("condition", condition);
// return 404 //
    burger.update({ eaten: req.body.eaten }, condition, (result) => {
        if (result.changedRows == 0) {
            
            return res.status(404).end();
        }
        res.status(200).end();
    });
});

router.delete("/api/burgers/:id", (req, res) => {
    const condition = { id: req.params.id };

    burger.delete(condition, (result) => {
        if (result.affectedRows == 0) {
            
            return res.status(404).end();
        }
        res.status(200).end();
    });
});

// Export routes //
module.exports = router;
