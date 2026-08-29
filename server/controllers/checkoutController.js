const db = require("../config/db");

// Borrow Book


const borrowBook = async (req, res) => {

    const { member_id, book_id } = req.body;
    
    let connection;
let transactionStarted = false;
  

    try {
          connection = await db.getConnection();

        // Check Member
        const [memberResult] = await connection.query(
            "SELECT * FROM members WHERE member_id = ?",
            [member_id]
        );

        if (memberResult.length === 0) {
            return res.status(404).json({
                message: "Member not found."
            });
        }

        const member = memberResult[0];

        if (member.current_checkouts >= 5) {
            return res.status(409).json({
                message: "Borrow limit reached."
            });
        }

        // Check Book
        const [bookResult] = await connection.query(
            "SELECT * FROM books WHERE book_id = ?",
            [book_id]
        );

        if (bookResult.length === 0) {
            return res.status(404).json({
                message: "Book not found."
            });
        }

        const book = bookResult[0];

        if (book.available_copies <= 0) {
            return res.status(409).json({
                message: "Book is currently unavailable."
            });
        }

        // Start Transaction
      

       await connection.beginTransaction();
       transactionStarted = true;

        // Insert Checkout
        const [checkoutResult] = await connection.query(
            `INSERT INTO checkouts
            (member_id, book_id, checkout_date, due_date)
            VALUES (?, ?, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 14 DAY))`,
            [member_id, book_id]
        );

        // Update Book
        await connection.query(
            `UPDATE books
             SET available_copies = available_copies - 1
             WHERE book_id = ?`,
            [book_id]
        );

        // Update Member
        await connection.query(
            `UPDATE members
             SET current_checkouts = current_checkouts + 1
             WHERE member_id = ?`,
            [member_id]
        );

        // Commit Transaction
       await connection.commit();
       transactionStarted = false;

       return res.status(201).json({
            message: "Book Borrowed Successfully!",
            checkoutId: checkoutResult.insertId
        });

    } catch (err) {
        
        
    if (connection && transactionStarted) {
        await connection.rollback();
    }
         
         

        console.error(err);

         return res.status(500).json({
            message: "Database Error"
        });
        

    }
    finally {
      if (connection) {
        connection.release();
    }
}

};


// Return Book


const returnBook = async (req, res) => {

    const { checkout_id } = req.body;
    
    let connection;
let transactionStarted = false;

  
  

    try {

        connection = await db.getConnection();
        // Find Checkout
        const [result] = await connection.query(
            "SELECT * FROM checkouts WHERE checkout_id = ?",
            [checkout_id]
        );

        if (result.length === 0) {
            return res.status(404).json({
                message: "Checkout not found."
            });
        }

        const checkout = result[0];

        if (checkout.status === "Returned") {
            return res.status(409).json({
                message: "Book has already been returned."
            });
        }

        // Start Transaction
      

       await connection.beginTransaction();
        transactionStarted = true;

        // Update Checkout
        await connection.query(
            `UPDATE checkouts
             SET status='Returned',
                 return_date=CURDATE()
             WHERE checkout_id=?`,
            [checkout_id]
        );

        // Update Book
        await connection.query(
            `UPDATE books
             SET available_copies = available_copies + 1
             WHERE book_id = ?`,
            [checkout.book_id]
        );

        // Update Member
        await connection.query(
            `UPDATE members
             SET current_checkouts = current_checkouts - 1
             WHERE member_id = ?`,
            [checkout.member_id]
        );

        // Commit Transaction
        await connection.commit()
        transactionStarted = false;

        return res.status(200).json({
            message: "Book Returned Successfully!"
        });

    } catch (err) {

      
    if (connection && transactionStarted) {
        await connection.rollback();
    }

        console.error(err);

         return res.status(500).json({
            message: "Database Error"
        });

    }
finally {
      if (connection) {
        connection.release();
    }
}
};
const getCheckouts = async (req, res) => {
    try {
        const [result] = await db.query(`
            SELECT
                c.checkout_id,
                c.member_id,
                m.name AS member_name,
                c.book_id,
                b.title AS book_title,
                c.checkout_date,
                c.due_date,
                c.return_date,
                c.status
            FROM checkouts c
            JOIN members m
                ON c.member_id = m.member_id
            JOIN books b
                ON c.book_id = b.book_id
            ORDER BY c.checkout_id DESC
        `);

        res.status(200).json(result);

    } catch (err) {

        console.error("Get Checkouts Error:", err);

        res.status(500).json({
            message: "Database Error"
        });
    }
};
module.exports = {
    borrowBook,
    returnBook,
    getCheckouts
};