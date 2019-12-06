//CLICK ON THE SHOPPING CART TO ADD / CLICK AGAIN TO DELETE
$(document).ready(function(){
    
    
    $(".cartIcon").on("click", function(){
        
        //alert($(this).attr("bar_ID"));
        
        var bar_id = $(this).attr("bar_id");
        var price = $(this).siblings('#price').text();
        price=price.replace("$","");
        
        if ($(this).attr("src") == "img/cartEmpty.png"){
            $(this).attr("src", "img/cartFull.png");
            updateCart("add", bar_id, price, 1);// default to one quantity
        } else {
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
    
    $("#quantity").on('keyup', function (e) {
        let qty = $("#quantity").val();
        let price = $(this).parent().siblings('#price').text();
        let bar_id= $(this).parent().siblings('#bar_id').text();
        price=price.replace("$","");
        if (e.keyCode === 13) {
            updateCart("update", bar_id, price, qty);
        }
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
    
    //function updateCart(action, bar_id, price) {
    // Adam commented the above out, below looked to be the right function, but 
    // was in an odd location
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
        
});