const express = require("express");
const app = express();
const session = require('express-session');
const bcrypt = require('bcrypt');

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(session({
    secret: "top secret!",
    resave: true,
    saveUninitialized: true
}));
app.use(express.urlencoded({extended: true}));

const request = require("request");
const mysql = require("mysql");
const tools = require("./tools.js");

// routes

app.get('/', function(req, res) {
    var conn = tools.createConnection();    
    conn.connect(function (err) {
        if (err) throw err;
        //var sql = "SELECT bar_id, candy_name, nut, nut_type, kcal, FORMAT(price,2) AS price FROM cst336_db026.p_bars";
        var sql = "SELECT bars.bar_id, bars.candy_name, nut, nut_type, kcal, FORMAT(bars.price,2) AS price, quantity FROM cst336_db026.p_bars bars LEFT JOIN p_cart cart ON bars.bar_id = cart.bar_id ORDER BY bar_id"
        conn.query(sql, function(err, result) {
            if (err) throw err;
            conn.end();
            res.render("index", {"candyInfo":result}
            );
            //console.log(result);
        });
    });
});


app.get("/adminLogin", function(req, res) {
    res.render("adminlogin.ejs");
});//adminLogin

app.post("/adminLogin", async function(req, res) {
    let username = req.body.inputEmail;
    let password = req.body.inputPassword;
    
    let result = await tools.checkUsername(username)
    console.dir(result);
    let hashedPwd = "";
    
    if (result.length > 0) {
        hashedPwd = result[0].password;
    }
    let passwordMatch = await tools.checkPassword(password, hashedPwd);
    
    if (passwordMatch) {
        req.session.authenticated = true;
        var conn = tools.createConnection();    
        conn.connect(function (err) {
            if (err) throw err;
            var sql = "SELECT bar_id, candy_name, wrap_color, nut, nut_type, FORMAT(size_oz,2) AS size_oz, kcal, FORMAT(price,2) AS price FROM cst336_db026.p_bars ORDER BY bar_id";
            conn.query(sql, function(err, result) {
                if (err) throw err;
                conn.end();
                res.render("admin", {"candyInfo":result}
                );
            });
        });
    }else {
        res.render("adminlogin", {"loginError":true});
    }
});//adminLogin POST

app.get("/myAccount", tools.isAuthenticated, function(req, res) {
    res.render("account");
});//authenticated account

app.get("/logout", function(req, res) {
    req.session.destroy();
    res.redirect("/");
});//logout

app.get("/admin", tools.isAuthenticated, function(req, res) {
    var conn = tools.createConnection();    
    conn.connect(function (err) {
        if (err) throw err;
        var sql = "SELECT bar_id, candy_name, wrap_color, nut, nut_type, FORMAT(size_oz,2) AS size_oz, kcal, FORMAT(price,2) AS price FROM cst336_db026.p_bars ORDER BY bar_id";
        conn.query(sql, function(err, result) {
            if (err) throw err;
            conn.end();
            res.render("admin", {"candyInfo":result}
            );
            //console.log(result);
        });
    });
});//admin

    
app.get('/cart', function(req, res) {
    var conn = tools.createConnection();    
    conn.connect(function (err) {
        if (err) throw err;
        var sql = "SELECT * FROM cst336_db026.p_cart";
        conn.query(sql, function(err, result) {
            if (err) throw err;
            conn.end();
            res.render("cart.ejs", {"cartInfo":result}
            );
        });
    });
});

app.get("/cart", function(req, res) {
    res.render("cart.ejs");
});//cart

app.get("/api/admin", function(req, res) {
    alert("api/updateAdmin");
    
    var conn = tools.createConnection();    
    conn.connect(function (err) {
        if (err) throw err;
        var sql = "SELECT bar_id, candy_name, nut, nut_type, kcal, FORMAT(price,2) AS price FROM cst336_db026.p_bars ORDER BY bar_id";
        conn.query(sql, function(err, result) {
            if (err) throw err;
            conn.end();
            res.send(result);
            console.log(result);
        });
    });
    
    
});//admin

//updateCart
app.get("/api/updateCart", function(req, res) {
    var conn = tools.createConnection();
    var sql;
    var sqlParams;
    
    if(req.query.action == "add") {
        sql = "INSERT INTO p_cart (bar_id, price) VALUES (?,?)";
        sqlParams = [req.query.bar_id, req.query.price];
    } else if (req.query.action == "delete") {
        sql = "DELETE FROM p_cart WHERE bar_id = ?";
        sqlParams = [req.query.bar_id];
    } else if(req.query.action == "update") {
        sql="UPDATE p_cart SET quantity = ? WHERE bar_id= ?";
        sqlParams = [req.query.qty, req.query.bar_id];
    }
    
    conn.connect(function(err){
        if (err) throw err;
        conn.query(sql, sqlParams, function(err, result){
            if (err) throw err;
        });//query
    });//connect
});//updateCart

//updateAdmin
app.get("/api/updateAdmin", function(req, res) {
    var conn = tools.createConnection();
    var sql = "DELETE FROM p_bars WHERE bar_id = ?";
    var sqlParams = [req.query.bar_id];
    
    conn.connect(function(err){
        if (err) throw err;
        conn.query(sql, sqlParams, function(err, result){
            if (err) throw err;
        });//query
    });//connect
});//updateAdmin

//adminUpdateItem
app.get("/api/adminUpdateItem", function(req, res) {
    var conn = tools.createConnection();
    var sql = "UPDATE p_bars SET candy_name = ?, wrap_color = ?, nut = ?, nut_type = ?, size_oz = ?, kcal = ?, price = ? WHERE bar_id = ?";
    var sqlParams = [req.query.candy_name, req.query.wrap_color, req.query.nut, req.query.nut_type, req.query.size_oz, req.query.kcal, req.query.price, req.query.bar_id];
    
    conn.connect(function(err){
        if (err) throw err;
        conn.query(sql, sqlParams, function(err, result){
            if (err) throw err;
        });//query
    });//connect
});//adminUpdateItem

//adminNewItem
app.get("/api/adminNewItem", function(req, res) {
    var conn = tools.createConnection();
    var sql = "INSERT INTO p_bars (candy_name, wrap_color, nut, nut_type, size_oz, kcal, price) VALUES (?,?,?,?,?,?,?)";
    var sqlParams = [req.query.candy_name, req.query.wrap_color, req.query.nut, req.query.nut_type, req.query.size_oz, req.query.kcal, req.query.price];
    
    conn.connect(function(err){
        if (err) throw err;
        conn.query(sql, sqlParams, function(err, result){
            if (err) throw err;
        });//query
    });//connect
});//adminNewItem

//reports
app.get("/api/priceReport", function(req, res) {
    var conn = tools.createConnection();
    var sql = "SELECT FORMAT(AVG(price), 2) AS avgPrice FROM cst336_db026.p_bars";
    
    conn.connect(function(err){
        if (err) throw err;
        conn.query(sql, function(err, result){
            if (err) throw err;
            conn.end();
            res.send(result);
        });//query
    });//connect
});
app.get("/api/calReport", function(req, res) {
    var conn = tools.createConnection();
    var sql = "SELECT FORMAT(AVG(kcal), 2) AS avgCal FROM cst336_db026.p_bars";
    
    conn.connect(function(err){
        if (err) throw err;
        conn.query(sql, function(err, result){
            if (err) throw err;
            conn.end();
            res.send(result);
        });//query
    });//connect
});
app.get("/api/colorReport", function(req, res) {
    var conn = tools.createConnection();
    var sql = "SELECT wrap_color as color, count(*) as count FROM cst336_db026.p_bars group by wrap_color;";
    
    conn.connect(function(err){
        if (err) throw err;
        conn.query(sql, function(err, result){
            if (err) throw err;
            conn.end();
            res.send(result);
        });//query
    });//connect
});//reports
 

// repurpose this for candy bar search?
app.get("/search", async function(req, res) {
    //console.dir(req);
    //console.log(req.query.keyword);
    var keyword = req.query.keyword;
    
    var imageURLs = await tools.getRandomImages(keyword, 9);
    //console.log("imageURLs: " + imageURLs);
    res.render("results", {"imageURLs":imageURLs, "keyword":keyword});
    
    var conn = tools.createConnection();
    var sql = "SELECT imageURL FROM favorites WHERE keyword = ?";
    var sqlParams = [req.query.keyword];
    
    conn.connect(function(err){
        
        if (err) throw err;
        conn.query(sql, sqlParams,function(err, results) {
            if (err) throw err;
            conn.end();
            res.send(results);
            
        });//query
        
    });//connect
    
});//search

// repurpose to display cart, no keyword search functionality needed
app.get("/api/displayFavorites", function(req, res) {
    
    var conn = tools.createConnection();
    var sql = "SELECT imageURL FROM favorites WHERE keyword = ?";
    var sqlParams = [req.query.keyword];
    
    conn.connect(function(err){
        
        if (err) throw err;
        conn.query(sql, sqlParams,function(err, results) {
            if (err) throw err;
            conn.end();
            res.send(results);
            
        });//query
        
    });//connect
    
});//display favorites

// server listener
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Express Server is running..")
})