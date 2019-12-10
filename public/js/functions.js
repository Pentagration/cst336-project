//CLICK ON THE SHOPPING CART TO ADD / CLICK AGAIN TO DELETE
$(document).ready(function(){
    
    setTotal();
    $(document).on("click", ".cartIcon", function(){
    
        var bar_id = $(this).attr("bar_id");
        var price = $(this).siblings('#price').text();
        price=price.replace("$","");
        
        if ($(this).attr("src") == "img/cartEmpty.png"){
            $(this).attr("src", "img/cartFull.png");
            updateCart("add", bar_id, price, 1);// default to one quantity
        } else if ($(this).attr("src") == "img/cartFull.png") {
            $(this).attr("src", "img/cartEmpty.png");
            updateCart("delete", bar_id, price, 0);
        }
    });
    
    // for the admin page to delete a row from the table
    $(document).on("click", ".delRow", function(){
        
        var bar_id = $(this).attr("bar_id");
        
        updateAdmin(bar_id);
        
        // to reload the page so the line goes away
        window.location.reload();
    });
    
    // for the admin page to update a row in the table
    $(document).on("click", ".updateItem", function(){
        
        let bar_id = ($(this).attr("bar_ID"));
        let candy_name = ($("input[bar_id=" + bar_id + "][name='candy_name']").val());
        let wrap_color = ($("input[bar_id=" + bar_id + "][name='wrap_color']").val());
        let nut = ($("input[bar_id=" + bar_id + "][name='nut']").val());
        let nut_type = ($("input[bar_id=" + bar_id + "][name='nut_type']").val());
        let size_oz = ($("input[bar_id=" + bar_id + "][name='size_oz']").val());
        let kcal = ($("input[bar_id=" + bar_id + "][name='kcal']").val());
        let price = ($("input[bar_id=" + bar_id + "][name='price']").val())
        
        adminUpdateItem(candy_name, wrap_color, nut, nut_type, size_oz, kcal, price, bar_id);
        
        // to reload the page so the line goes away
        window.location.reload();
    });
    
    
    // for the admin page to insert a row in the table
    $(document).on("click", ".newItem", function(){
        
        let candy_name = ($('input[ftype="new"][name="candy_name"]').val());
        let wrap_color = ($('input[ftype="new"][name="wrap_color"]').val());
        let nut = ($("#nut").val());
        let nut_type = ($('input[ftype="new"][name="nut_type"]').val());
        let size_oz = ($('input[ftype="new"][name="size_oz"]').val());
        let kcal = ($('input[ftype="new"][name="kcal"]').val());
        let price = ($('input[ftype="new"][name="price"]').val());
        
        adminNewItem(candy_name, wrap_color, nut, nut_type, size_oz, kcal, price);
        
        // to reload the page so the line goes away
        window.location.reload();
    });
    
    //Button to update cart on cart.ejs
    $("#cartButton").on("click", function(){
        let bar_id = [];
        let qty = [];
        let price=[];
        let total=[];
        $("tr").each(function(index,element){
           //alert($(element).children("#bar_id").text()); 
            if (index != 0){
                total.push($(element).children("#total").text().replace("$",""));
                price.push($(element).children("#price").text().replace("$",""));
                bar_id.push($(element).children("#bar_id").text());
                qty.push($(element).children("#qty").children("#quantity").val());
            }
        });
        
        $.ajax({
            method: "get",
            url: "/api/updateCartBtn",
            data: { "bar_id":bar_id,
                    "qty":qty,
                    "total":total,
                    "price":price
            }
        });
        location.reload();
    });//cartbutton
    
    function setTotal(){
        let subtotal=0;
        $("tr").each(function(index,element){
            if(index != 0){
                subtotal+=Number($(element).children("#total").text().replace("$",""));
            }//if
        });
        $("#summary").children("#cart_subtotal").text("$"+subtotal.toFixed(2));
        $("#summary").children("#cart_total").text("$"+(subtotal*1.15).toFixed(2));
    };//setTotal
    
    function updateCart(action, bar_id, price, qty) {
        console.log("UpdateCart Functions");
        $.ajax({
            method: "get",
            url: "/api/updateCart",
            data: {"bar_id":bar_id, "price":price,"qty":qty,"action":action}
        });
        
    };
    
    function updateAdmin(bar_id) {
        
        $.ajax({
            method: "get",
            url: "/api/updateAdmin",
            data: {"bar_id":bar_id},
        });
    };
    
    function adminUpdateItem(candy_name, wrap_color, nut, nut_type, size_oz, kcal, price, bar_id) {
        
        $.ajax({
            method: "get",
            url: "/api/adminUpdateItem",
            data: { "candy_name":candy_name,
                    "wrap_color":wrap_color,
                    "nut":nut,
                    "nut_type":nut_type,
                    "size_oz":size_oz,
                    "kcal":kcal,
                    "price":price,
                    "bar_id":bar_id},
        });
    };
    
    function adminNewItem(candy_name, wrap_color, nut, nut_type, size_oz, kcal, price) {
        
        $.ajax({
            method: "get",
            url: "/api/adminNewItem",
            data: { "candy_name":candy_name,
                    "wrap_color":wrap_color,
                    "nut":nut,
                    "nut_type":nut_type,
                    "size_oz":size_oz,
                    "kcal":kcal,
                    "price":price},
        });
    };
    
    $("#priceReport").on("click", function(){
        //clear prior message
        $("#reportOutput").html("");
        
        $.ajax({
            method: "get",
            url: "/api/priceReport",
            success: function(result,status) {
    
                $("#reportOutput").html("The average price of all bars is $" + result[0].avgPrice);
            } 
        });//ajax
    });//report
    
    $("#calReport").on("click", function(){
        //clear prior message
        $("#reportOutput").html("");
        
        $.ajax({
            method: "get",
            url: "/api/calReport",
            success: function(result,status) {
    
                $("#reportOutput").html("The average calories of all bars is " + result[0].avgCal);
            } 
        });//ajax
    });//report
    
    $("#colorReport").on("click", function(){
        //clear prior message
        $("#reportOutput").html("<table id='reportTable' class='table table-striped'><tr><th>Color</th><th>Count</th></tr><br>");
        
        $.ajax({
            method: "get",
            url: "/api/colorReport",
            success: function(result,status) {
    
                
                for (let i = 0; i < result.length; i++) {
                $("#reportTable").append("<tr><td>" + result[i].color + "</td><td>" + result[i].count + "</td></tr><br></table>");
                }
            } 
        });//ajax
    });//report
    
    //Button to update cart on cart.ejs
    function updateCartBtn() {
        
        };
        
    //No Nuts Search
    $("#noNuts").on("click", function(){
        $.ajax({
            method: "get",
            url: "/api/noNuts",
            success: function(results,status) {
            
            var candyInfo = results;
            var length = results.length;
            var cart = "";
            
            $("#result").html("");
            
            for (let i =0; i< length; i++) {
                
                if (candyInfo[i].qty_instock == 0) {
                    cart = '<img bar_id='+candyInfo[i].bar_id+' class="cartIcon" src="img/outofstock.png" width="20" align="right">';
                } else if (candyInfo[i].quantity > 0) {
                    cart = '<img bar_id='+candyInfo[i].bar_id+' class="cartIcon" src="img/cartFull.png" width="20" align="right">';
                } else {
                    cart = '<img bar_id='+candyInfo[i].bar_id+' class="cartIcon" src="img/cartEmpty.png" width="20" align="right">';
                }

                $("#result").append('<div class="col-lg-4 col-md-6 mb-4">'
            + '<div class="card h-100">'
            + '<img class="card-img-top" src="img/bars/'+candyInfo[i].bar_id+'.jpg">'
            + '<div class="card-body">'
            + '<h4 class="card-title">'+candyInfo[i].candy_name+''
            + '</h4><h5 id="price">$'+candyInfo[i].price+'</h5>'
            + '<ul class="card-text">'
            + '<li id="nuts"><b>Nuts: </b>'+candyInfo[i].nut+' </li>'
            + '<li id ="nutType"><b>Nut Type: </b>'+candyInfo[i].nut_type+'</li>'
            + '<li id= "calories"><b>Calories: </b>'+candyInfo[i].kcal+'</li>'
            + '</ul>'+cart+'</div></div></div>');
            
            }//forEach
            }//success
        });//ajax
    });//NoNuts END
    
    //nuts Search
    $("#nuts").on("click", function(){
        $.ajax({
            method: "get",
            url: "/api/nuts",
            success: function(results,status) {
            
            var candyInfo = results;
            var length = results.length;
            
            $("#result").html("");
            
            for (let i =0; i< length; i++) {
                
                if (candyInfo[i].qty_instock == 0) {
                    cart = '<img bar_id='+candyInfo[i].bar_id+' class="cartIcon" src="img/outofstock.png" width="20" align="right">';
                } else if (candyInfo[i].quantity > 0) {
                    cart = '<img bar_id='+candyInfo[i].bar_id+' class="cartIcon" src="img/cartFull.png" width="20" align="right">';
                } else {
                    cart = '<img bar_id='+candyInfo[i].bar_id+' class="cartIcon" src="img/cartEmpty.png" width="20" align="right">';
                }

                $("#result").append('<div class="col-lg-4 col-md-6 mb-4">'
            + '<div class="card h-100">'
            + '<img class="card-img-top" src="img/bars/'+candyInfo[i].bar_id+'.jpg">'
            + '<div class="card-body">'
            + '<h4 class="card-title">'+candyInfo[i].candy_name+''
            + '</h4><h5 id="price">$'+candyInfo[i].price+'</h5>'
            + '<ul class="card-text">'
            + '<li id="nuts"><b>Nuts: </b>'+candyInfo[i].nut+' </li>'
            + '<li id ="nutType"><b>Nut Type: </b>'+candyInfo[i].nut_type+'</li>'
            + '<li id= "calories"><b>Calories: </b>'+candyInfo[i].kcal+'</li>'
            + '</ul>'+cart+'</div></div></div>');
            
            }//forEach
            }//success
        });//ajax
    });//nuts END
    
    //showAll Search
    $("#showAll").on("click", function(){
        $.ajax({
            method: "get",
            url: "/api/showAll",
            success: function(results,status) {
            
            var candyInfo = results;
            var length = results.length;
            
            $("#result").html("");
            
            for (let i =0; i< length; i++) {
                
            if (candyInfo[i].qty_instock == 0) {
                cart = '<img bar_id='+candyInfo[i].bar_id+' class="cartIcon" src="img/outofstock.png" width="20" align="right">';
            } else if (candyInfo[i].quantity > 0) {
                cart = '<img bar_id='+candyInfo[i].bar_id+' class="cartIcon" src="img/cartFull.png" width="20" align="right">';
            } else {
                cart = '<img bar_id='+candyInfo[i].bar_id+' class="cartIcon" src="img/cartEmpty.png" width="20" align="right">';
            }

                $("#result").append('<div class="col-lg-4 col-md-6 mb-4">'
            + '<div class="card h-100">'
            + '<img class="card-img-top" src="img/bars/'+candyInfo[i].bar_id+'.jpg">'
            + '<div class="card-body">'
            + '<h4 class="card-title">'+candyInfo[i].candy_name+''
            + '</h4><h5 id="price">$'+candyInfo[i].price+'</h5>'
            + '<ul class="card-text">'
            + '<li id="nuts"><b>Nuts: </b>'+candyInfo[i].nut+' </li>'
            + '<li id ="nutType"><b>Nut Type: </b>'+candyInfo[i].nut_type+'</li>'
            + '<li id= "calories"><b>Calories: </b>'+candyInfo[i].kcal+'</li>'
            + '</ul>'+cart+'</div></div></div>');
            
            }//forEach
            }//success
        });//ajax
    });//showAll END
    
    //inventory Search
    $("#inventory").on("click", function(){
        $.ajax({
            method: "get",
            url: "/api/inventory",
            success: function(results,status) {
            
            var candyInfo = results;
            var length = results.length;
            
            $("#result").html("");
            
            for (let i =0; i< length; i++) {
                
            if (candyInfo[i].qty_instock == 0) {
                cart = '<img bar_id='+candyInfo[i].bar_id+' class="cartIcon" src="img/outofstock.png" width="20" align="right">';
            } else if (candyInfo[i].quantity > 0) {
                cart = '<img bar_id='+candyInfo[i].bar_id+' class="cartIcon" src="img/cartFull.png" width="20" align="right">';
            } else {
                cart = '<img bar_id='+candyInfo[i].bar_id+' class="cartIcon" src="img/cartEmpty.png" width="20" align="right">';
            }
                
                $("#result").append('<div class="col-lg-4 col-md-6 mb-4">'
            + '<div class="card h-100">'
            + '<img class="card-img-top" src="img/bars/'+candyInfo[i].bar_id+'.jpg">'
            + '<div class="card-body">'
            + '<h4 class="card-title">'+candyInfo[i].candy_name+''
            + '</h4><h5 id="price">$'+candyInfo[i].price+'</h5>'
            + '<ul class="card-text">'
            + '<li id="nuts"><b>Nuts: </b>'+candyInfo[i].nut+' </li>'
            + '<li id="nutType"><b>Nut Type: </b>'+candyInfo[i].nut_type+'</li>'
            + '<li id="calories"><b>Calories: </b>'+candyInfo[i].kcal+'</li>'
            + '<li id="inventoryQty"><b>Inventory: </b>'+candyInfo[i].qty_instock+'</li>'
            + '</ul>'+cart+'</div></div></div>');
            
            }//forEach
            }//success
        });//ajax
    });//inventory END
    
    //wrapcolor Search
    $("#color").on("click", function(){
        $.ajax({
            method: "get",
            url: "/api/color",
            success: function(results,status) {
            
            var candyInfo = results;
            var length = results.length;
            
            $("#result").html("");
            
            for (let i =0; i< length; i++) {
                
            if (candyInfo[i].qty_instock == 0) {
                cart = '<img bar_id='+candyInfo[i].bar_id+' class="cartIcon" src="img/outofstock.png" width="20" align="right">';
            } else if (candyInfo[i].quantity > 0) {
                cart = '<img bar_id='+candyInfo[i].bar_id+' class="cartIcon" src="img/cartFull.png" width="20" align="right">';
            } else {
                cart = '<img bar_id='+candyInfo[i].bar_id+' class="cartIcon" src="img/cartEmpty.png" width="20" align="right">';
            }

                $("#result").append('<div class="col-lg-4 col-md-6 mb-4">'
            + '<div class="card h-100">'
            + '<img class="card-img-top" src="img/bars/'+candyInfo[i].bar_id+'.jpg">'
            + '<div class="card-body">'
            + '<h4 class="card-title">'+candyInfo[i].candy_name+''
            + '</h4><h5 id="price">$'+candyInfo[i].price+'</h5>'
            + '<ul class="card-text">'
            + '<li id="nuts"><b>Nuts: </b>'+candyInfo[i].nut+' </li>'
            + '<li id ="nutType"><b>Nut Type: </b>'+candyInfo[i].nut_type+'</li>'
            + '<li id= "calories"><b>Calories: </b>'+candyInfo[i].kcal+'</li>'
            + '</ul>'+cart+'</div></div></div>');
            
            }//forEach
            }//success
        });//ajax
    });//wrapcolor END
    
});//EOF
