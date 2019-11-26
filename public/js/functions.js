//CLICK ON THE SHOPPING CART TO ADD / CLICK AGAIN TO DELETE
$(document).ready(function(){
    $(".cartIcon").on("click", function(){
        if ($(this).attr("src") == "img/cartEmpty.png"){
            $(this).attr("src", "img/cartFull.png");
        } else {
            $(this).attr("src", "img/cartEmpty.png");            
        }
    });
});