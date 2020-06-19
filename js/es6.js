/**************************************************** */
                //USING ES6 SYNTAX
/**************************************************** */

//initializing
const ui = new UI();

//storing all shopping item objects in array
ui.loadShopItems()

//EVENT LISTENER
var container = document.getElementById('content');

container.addEventListener('click', (e) => {
//add to cart button  
    ui.addToCart(e.target);
    e.preventDefault();
});

/* 
Before: 
for (var i=0; i<addBtns.length; i++){
    var button = addBtns[i];
    button.addEventListener('click', (e) => {
        var x = e.target.parentElement.id;
        let item = find(x);
        ui.addToCart(item);
        ui.updateCartTotal();
        Store.addItem(item);
    }); 
    
}*/
//delete from cart
document.getElementById("cart").addEventListener('click', (e) => {
    
    ui.deleteItem(e.target);
    e.preventDefault();
    ui.updateCartTotal()
});

//clear all from cart
document.getElementById('clear-btn').addEventListener('click', (e) => {
    
    
    deleteBtns = document.getElementsByClassName('delete');
    for(i=0; i<deleteBtns.length; i++){
        // :( only deletes last item
        ui.deleteItem(deleteBtns[i])
        // :( link to item's card to toggle the button back to green "ADD TO CART" how?
    }
    e.preventDefault();
});

//cart quantity change
document.getElementById("cart").addEventListener('change', (e) => {
    // find the item object targeted.. from array. 
    let itemID = e.target.classList[0]; //class name = name in array
    let object_targeted = ui.find(itemID); 

    let newPrice = ui.quantityChange(e.target, object_targeted);
    e.target.parentElement.nextSibling.nextSibling.innerHTML = newPrice;

    ui.updateCartTotal();
});

//calculate cart total
document.getElementById("shop-list").addEventListener('submit', (e) => {
    ui.updateCartTotal()
});

//purchase made
document.getElementById("buy-btn").addEventListener('click', (e) => {
    ui.purchaseClicked();
    ui.updateCartTotal();
    e.preventDefault();
});

/////////showing and exiting from cart!
//SHOWING AND HIDING THE CART (UI)
var cart = document.getElementById('cart');
var showBtn = document.getElementById('showCart');
var exitBtn = document.getElementById('exitCart');
var content = document.getElementById('content');//rest of container

function display_cart(){
    if(event.target.id == "showCart"){
        cart.style.display='block';
        exitBtn.style.display='inline';
        showBtn.style.display='none'; 
        content.style.display='none';
    }
    else{ //for exitCart btn
        exitBtn.style.display='none';    
        cart.style.display='none';
        showBtn.style.display='inline'; 
        content.style.display='block';
    }
}

// DOM Load Event
// document.addEventListener('DOMContentLoaded', Store.displayItems);

