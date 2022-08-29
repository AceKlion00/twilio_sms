const express = require("express");

const router = express.Router();
router.get("/", (req, res, next) => {
    //res.status(200).json({ "MESS": "OK" })
    /*res.render("blank", {
        pageKey: "dash",
        pageTitle: "Dashboard"
    });*/
    res.render("blank", {
        pageKey: "singlesend",
        pageTitle: "Single Send"
    });
});
router.get("/user", (req, res, next) => {
    //res.status(200).json({ "MESS": "OK" })
    res.render("blank", {
        pageKey: "users",
        pageTitle: "Users"
    });
});
router.get("/contacts", (req, res, next) => {
    //res.status(200).json({ "MESS": "OK" })
    res.render("blank", {
        pageKey: "contacts",
        pageTitle: "Contacts"
    });
});
router.get("/lists", (req, res, next) => {
    //res.status(200).json({ "MESS": "OK" })
    res.render("blank", {
        pageKey: "lists",
        pageTitle: "Lists"
    });
});
router.get("/singlesend", (req, res, next) => {
    //res.status(200).json({ "MESS": "OK" })
    res.render("blank", {
        pageKey: "singlesend",
        pageTitle: "Single Send"
    });
});
router.get("/groupsend", (req, res, next) => {
    //res.status(200).json({ "MESS": "OK" })
    res.render("blank", {
        pageKey: "groupsend",
        pageTitle: "Group Send"
    });
});
module.exports = router;