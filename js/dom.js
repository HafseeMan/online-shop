/**************************************************** */
                //USING DOM TRAVERSING
/**************************************************** */

//grabbing elements
var cartList = document.getElementById('shop-list');
var cards = document.getElementsByClassName('card');

//ADD TO CART
    var addBtns = document.getElementsByClassName('addBtn');
    for (var i=0; i<addBtns.length; i++){
        var button = addBtns[i];
        button.addEventListener('click', addToCartClicked);
    }
function addToCartClicked(event) {
    var button = event.target
    var itemName = button.parentElement.firstChild.nextSibling.innerText;
   
    var imageSrc = button.parentElement.childNodes[3].innerHTML;

  // imageSrc = imageSrc.classList.add('cart-img');
    var price = event.target.parentElement.childNodes[7].childNodes[1].innerHTML;

    addItemToCart(imageSrc, itemName, price);
 
   
    updateCartTotal()

}

function addItemToCart(imageSrc, itemName, price){

    var list = document.getElementById('shop-list');
    var newItem = document.createElement('tr');
    var newCartItem = `
        
            <td><img src='imgs/item1.jpg' class="cart-img"></td>
            <td>${itemName}</td>
            <td><input value= '1' class= 'quantity-input' type='number'></td>
            <td class="item-price">${price}</td>
            <td><a href="#" class="delete text-danger">X<a></td>
        
            `

    newItem.innerHTML = newCartItem;
    list.append(newItem)

    newItem.getElementsByClassName('item-price')[0].innerText = parseInt(price);

    newItem.getElementsByClassName('delete')[0].addEventListener('click', removeCartItem)
    newItem.getElementsByClassName('quantity-input')[0].addEventListener('change', quantityChanged)
    updateCartTotal()
}
//DELETE FROM CART
var removeCartItemButtons = document.getElementsByClassName('delete')
for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i]
    button.addEventListener('click', removeCartItem)
}
function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

//QUANTITY CHANGED
var quantityInputs = document.getElementsByClassName('quantity-input')
for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i]
    input.addEventListener('change', quantityChanged)
}
function quantityChanged(event) {
    var input = event.target
    //if NotANumber, 0 , or negative set value inside to 1. 
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    
    console.log(input.parentElement.nextSibling.nextSibling.innerHTML)
    updateCartTotal()
}

//UPDATING TOTAL (CART)
function updateCartTotal() {
    var inputs = document.getElementsByClassName('quantity-input');
    var total = 0
    for (var i = 0; i < inputs.length; i++) {
       
        var input = inputs[i];
        var quantity = input.value;
        var price = parseFloat(document.getElementsByClassName('item-price')[i].innerText);
        total = total + (price * quantity)

    price += price * quantity;
    }
    //from floating point to whole number
    total = Math.round(total * 100) / 100
  //  = price * quantity;
    document.getElementById('finalPrice').innerText = total;
}

//PURCHASE CLICKED

function purchaseClicked() {
    if(cartList.hasChildNodes()){
        alert('Thank you for your purchase')

        //empty the cart
        while (cartList.hasChildNodes()) {
            cartList.removeChild(cartList.firstChild)
        }
        updateCartTotal()
    }
    else{
        alert('add to cart');
    }
}

//SHOWING AND HIDING THE CART (UI)
var cart = document.getElementById('cart');
var showBtn = document.getElementById('showCart');
var exitBtn = document.getElementById('exitCart');
var content = document.getElementById('content');//rest of container

//.. show cart btn
function showCart(){   
    cart.style.display='block';
    exitBtn.style.display='block';
    showBtn.style.display='none'; 
    content.style.display='none';
}
//... For exit btn
function exitCart(){
    exitBtn.style.display='none';    
    cart.style.display='none';
    showBtn.style.display='block'; 
    content.style.display='block';
}