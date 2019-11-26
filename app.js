const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));

const request = require("request");
const mysql = require("mysql");
const tools = require("./tools.js");

// routes

app.get('/', function(req, res) {
    var conn = tools.createConnection();    
    conn.connect(function (err) {
        if (err) throw err;
        var sql = "SELECT * FROM cst336_db026.p_bars";
        conn.query(sql, function(err, result) {
            if (err) throw err;
            res.render("index", {"candyInfo":result}
            );
            console.log(result);
        });
    });
});


app.get("/admin", function(req, res) {
    res.render("adminlogin.ejs");
});//admin


app.get("/cart", function(req, res) {
    res.render("cart.ejs");
});//cart

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

// repurpose this for cart update?
app.get("/api/updateFavorites",function(req, res) {
    
    var conn = tools.createConnection();
    var sql;
    var sqlParams;
    
    if(req.query.action == "add") {
        sql = "INSERT INTO favorites (imageURL, keyword) VALUES (?, ?)";
        sqlParams = [req.query.imageURL, req.query.keyword];
    } else {
        sql = "DELETE FROM favorites WHERE imageURL = ?";
        sqlParams = [req.query.imageURL];
    }
    
    
    conn.connect(function(err){
        
        if (err) throw err;
        
        conn.query(sql, sqlParams, function(err, result){
            
            if (err) throw err;
            
        });//query
        
    });//connect
    
});//update favorites


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