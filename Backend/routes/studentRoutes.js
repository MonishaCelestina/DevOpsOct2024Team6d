const express = require("express");
const router = express.Router();
const StudentController = require("../controllers/studentController"); // Import the controller

// Route to fetch student details
router.get("/students/:studentID", StudentController.getStudentDetails);

router.get("/:studentID/redeemable-items", StudentController.getRedeemableItems);


router.post("/:studentID/redeem", StudentController.redeemItem);



module.exports = router;
