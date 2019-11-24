const request = require("request");
const mysql = require("mysql");

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
    }

};//END exports