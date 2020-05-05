//Using ES5
function item(name, price, amount){
    this.name = name;
    this.price = price;
    this.image = amount;
}

//UI Constructor
function UI() {}

//Add item to cart
UI.prototype.addToCart = function(item){
    const list = document.getElementById('shop-list');
    //create tr element
    const row = document.createElement('tr');
    //insert cols
    row.innerHTML = `
    <td>${item.name}</td>
    <td>${item.amount}</td>
    <td>${item.price}</td>
    <td><a href="#" class="delete">X<a></td>
  `;
  list.appendChild(row);
}

//Delete function
UI.prototype.deleteItem = function(target){
    //if class name of targeted element is 'delete' ..
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }
}

//Array of objects
 const shopItems = [{name: 'item 1', price: 2500 , amount: 1},{name: 'item 2', price: 5000 , amount: 1},{name: 'item 3', price: 2500 , amount: 1}]

 //grabing elements
 var cart = document.getElementById('cart');
 var showBtn = document.getElementById('showCart');
 var exitBtn = document.getElementById('exitCart');
 var content = document.getElementById('content');//rest of container

 //Event Listener for show cart btn
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
//Event Listener for add to cart

//WHEN "ADD CART BTN" IS CLICKED.. ADD THE NAME AND PRICE OF IT'S OBJECT TO TABLE IN THE CART.



