const { Router } = require("express");
const bookController = require("../controllers/bookController");

const bookRouter = Router();

bookRouter.post("/addContact", bookController.addContact);
bookRouter.put("/editContact", bookController.editContact);
bookRouter.get("/viewAllContact", bookController.viewAllContact);
bookRouter.delete("/deleteContact", bookController.deleteContact);
bookRouter.get("/searchContact", bookController.searchContact);

module.exports = bookRouter;
