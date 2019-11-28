const request = require("request");
const mysql = require("mysql");
const bcrypt = require('bcrypt');
const tools = require("./tools.js");

module.exports = {
    /**
     * creates database connection
     * @return db connection
     */
    
    createConnection: function(){
        var conn = mysql.createConnection({
            host: "cst336db.space",
            user: "cst336_dbUser026",
            password: "uzef6q",
            database: "cst336_db026"
        });
        return conn;
        },
    

    // check passwords for admin login
    /**
     * Checks the bcrypt value of the password submitted
     * @param {string} password
     * @return {boolean} true if password hashed matches stored hash value, else false
     */
    checkPassword: function (password, hashedValue) {
        return new Promise(function(resolve, reject) {
            bcrypt.compare(password, hashedValue, function (err, result) {
                console.log("Result: " + result);
                resolve(result);
            });
        });
    },
    
    // checks if user is authenticated
    isAuthenticated: function (req, res, next) {
        if(!req.session.authenticated) {
            res.redirect('/adminLogin');
        } else {
            next()
        }
    //}
    },
    
    /**
     * Checks whether the username exists in the database.
     * if found, returns teh corresponding record.
     * @param {string} username
     * @return {array of objects}
     */
     checkUsername: function (username) {
         let sql = "SELECT * FROM cst336_db026.p_authentication WHERE username = ?";
         return new Promise(function(resolve, reject) {
             let conn = module.exports.createConnection();
             conn.connect(function(err) {
                 if (err) throw err;
                 conn.query(sql, [username], function (err, rows, fields) {
                     if (err) throw err;
                     console.log("Rows found: " + rows.length);
                     resolve(rows);
                 });//query
             });//connect
         });//promise
     }
    
    };//END exports