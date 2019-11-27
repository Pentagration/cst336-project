//CLICK ON THE SHOPPING CART TO ADD / CLICK AGAIN TO DELETE
$(document).ready(function(){
    $(".cartIcon").on("click", function(){
        
        //alert($(this).attr("barID"));
        
        var bar_id = $(this).attr("bar_id");
        
        if ($(this).attr("src") == "img/cartEmpty.png"){
            $(this).attr("src", "img/cartFull.png");
            
            updateCart(bar_id);
            
        } else {
            $(this).attr("src", "img/cartEmpty.png");            
        }
    });
    
    function updateCart(bar_id) {
        $.ajax({
            method: "get",
            url: "/api/updateCart",
            data: {"bar_id":bar_id, "action":action}
        });
    }
});