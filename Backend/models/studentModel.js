const db = require("../db");

const StudentModel = {
    // Fetch student details
    getStudentDetails: (studentID, callback) => {
        const sql = "SELECT * FROM Students WHERE studentID = ?";
        db.query(sql, [studentID], callback);
    },

    // Fetch redeemable items
    getRedeemableItems: (callback) => {
        const sql = "SELECT * FROM RedeemableItems WHERE quantity > 0";
        db.query(sql, [studentID], (err, results) => {
            if (err) return callback(err, null);
            callback(null, results);})
    },

    // Check student points and item availability
    checkStudentAndItem: (studentID, itemID, callback) => {
        const sql = `
            SELECT Students.points AS studentPoints, 
                   RedeemableItems.pointsRequired, 
                   RedeemableItems.quantity
            FROM Students
            JOIN RedeemableItems ON RedeemableItems.itemID = ?
            WHERE Students.studentID = ?
        `;
        db.query(sql, [itemID, studentID], callback);
    },

    // Redeem an item (Deduct points and reduce quantity)
    redeemItem: (studentID, itemID, pointsRequired, callback) => {
        const updateStudentPoints = "UPDATE Students SET points = points - ? WHERE studentID = ?";
        const updateItemQuantity = "UPDATE RedeemableItems SET quantity = quantity - 1 WHERE itemID = ?";

        // Execute the two queries separately
        db.query(updateStudentPoints, [pointsRequired, studentID], (err, results) => {
            if (err) {
                console.error("Error updating student points:", err);
                return callback(err);
            }

            db.query(updateItemQuantity, [itemID], (err, results) => {
                if (err) {
                    console.error("Error updating item quantity:", err);
                    return callback(err);
                }

                callback(null, results); // No errors, return success
            });
        });
    }
};

module.exports = StudentModel;
