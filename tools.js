const request = require("request");
const mysql = require("mysql");

module.exports = {

/**FUNCTION DEFN: getRandomImages_cb
 * Return random image URLs from an API
 * @param string keyword - search term
 * @param int imageCount - number of random images
 * @return array of image URLs
 */
getRandomImages_cb: function(keyword, imageCount, callback){
    var requestURL = "https://api.unsplash.com/photos/random?query="+keyword+"&count="+imageCount+"&client_id=8d124ac86a678dadd3b195223e5e2e76c27df4e86afe327505fdc57179891b69&orientation=landscape";
    request(requestURL, function(error, response, body){
        if (!error){
            var parsedData = JSON.parse(body);
            var imageURLs = [];
            
            for(let i = 0; i < imageCount; i++){
                imageURLs.push(parsedData[i].urls.regular);
            }
            callback(imageURLs);
        }
        else {
            console.log("error", error);
        }
    });//request    
},//getRandomImages_cb END

/**FUNCTION DEFN: getRandomImages_promise
 * Return random image URLs from an API
 * @param string keyword - search term
 * @param int imageCount - number of random images
 * @return array of image URLs
 */
getRandomImages: function(keyword, imageCount){
        var requestURL = "https://api.unsplash.com/photos/random?query="+keyword+"&count="+imageCount+"&client_id=8d124ac86a678dadd3b195223e5e2e76c27df4e86afe327505fdc57179891b69&orientation=landscape";
        
        return new Promise(function(resolve, reject) {              //<--return new promise surrounds async function
        request(requestURL, function(error, response, body){
            if (!error){
                var parsedData = JSON.parse(body);
                var imageURLs = [];
                
                for(let i = 0; i < imageCount; i++){
                    imageURLs.push(parsedData[i].urls.regular);
                };
                
                resolve(imageURLs);
                
            }
            else {
                console.log("error", error);
            };
        });//request  
    });//promise
},//getRandomImages_cb END


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