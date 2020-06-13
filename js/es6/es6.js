/**************************************************** */
                //USING ES6 SYNTAX
/**************************************************** */

//initializing
const ui = new UI();

//storing all shopping item objects in array
const item1 = new Item("item1", "Dress 1", 2500, "item5.jpg");
const item2 = new Item("item2", "Dress 2", 7500, "item1.jpg");
const item3 = new Item("item3", "Dress 3", 8500, "item3.jpg");
const item4 = new Item("item4", "Dress 4", 2500, "item4.jpg");
const item5 = new Item("item5", "Dress 5", 3500, "item2.jpg");
const item6 = new Item("item6", "Dress 6", 4500, "item6.jpg");
const item7 = new Item("item7", "Dress 7", 3500, "item7.jpg");
const item8 = new Item("item8", "Dress 8", 4500, "item8.jpg");

itemsArray = [ item1, item2, item3, item4, item5, item6, item7, item8];

function find(x) {
    for(let i=0; i<itemsArray.length;  i++){
            if(itemsArray[i].id == x){
                return  itemsArray[i];
                break;
            }
        }
}

// DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayItems);

//EVENT LISTENER
//add to cart
var addBtns = document.getElementsByClassName('addBtn');
for (var i=0; i<addBtns.length; i++){
    var button = addBtns[i];
    button.addEventListener('click', (e) => {
        var x = e.target.parentElement.id;
        let item = find(x);
      // ui.check_for_in_store(item);
        ui.addToCart(item);
        ui.updateCartTotal();
        Store.addItem(item);
    });
    
}
//delete from cart
document.getElementById("cart").addEventListener('click', (e) => {
    
    ui.deleteItem(e.target);
    e.preventDefault();
    ui.updateCartTotal()
});

//cart quantity change
document.getElementById("cart").addEventListener('change', (e) => {
    // find the item object targeted.. from array. 
    let itemID = e.target.classList[0]; //class name = name in array
    let object_targeted = find(itemID); 

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

