//CLICK ON THE SHOPPING CART TO ADD / CLICK AGAIN TO DELETE
$(document).ready(function(){
    $(".cartIcon").on("click", function(){
        
        //alert($(this).attr("bar_ID"));
        
        var bar_id = $(this).attr("bar_id");
        
        if ($(this).attr("src") == "img/cartEmpty.png"){
            $(this).attr("src", "img/cartFull.png");
            updateCart("add", bar_id);
        } else {
            $(this).attr("src", "img/cartEmpty.png");
            updateCart("delete", bar_id);
        }
    });
    
    // for the admin page to delete a row from the table
    $(document).on("click", ".delRow", function(){
        
        alert($(this).attr(name, "price").val());
        
        var bar_id = $(this).attr("bar_id");
        
        updateAdmin(bar_id);
        
        // to reload the page so the line goes away
        window.location.reload();
    });
    
    function updateCart(action, bar_id) {
        console.log("UpdateCart Functions");
        $.ajax({
            method: "get",
            url: "/api/updateCart",
            data: {"bar_id":bar_id, "action":action}
        });
    };
    
    function updateAdmin(bar_id) {
        
        $.ajax({
            method: "get",
            url: "/api/updateAdmin",
            data: {"bar_id":bar_id},
        });
    };
    
    //Button to update cart on cart.ejs
    function updateCartBtn() {
        
        }
});