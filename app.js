//Using ES5
function item(name, price, amount){
    this.name = name;
    this.price = price;
    this.image = amount;
}

//UI Constructor
function UI() {}

//Add item to cart
UI.prototype.addToCart = function(target){
   if(target.className === 'addBtn'){
    var card = Boo; //event.target.parentNode;
    var title = Boo; //card.getElementsByClassName('itemName')[0].innerText;
    var price = 1000;
    var imgSrc = '/imgs/item1.jpg';

    console.log('butt');
    //addItemToCart(imgSrc, title, price)

   }
}
/*
   //find the dress object in the array of dress objects and display properties in cart
    function returnDress(dress) {
        return  dress.name === title;
    }
    console.log(dresses.find(returnDress)); //undefined??? why?

    var dress = dresses.find(returnDress);
    addItemToCart(dress.img, dress.name, dress.price);
*/


   // updateCartTotal()

function addItemToCart(img, title, price){
    var list = document.getElementById('shop-list');
    var newCartItem = `
        <tr> 
            <td><img src='"${img}"' class='cart-img'></td>
            <td>"${title}"</td>
            <td><input value= '1' class= 'quantity-input' type='number'></td>
            <td>"${price}"</td>
            <td><a href="#" class="delete">X<a></td>
    
            `

    list.innerHTML+= newCartItem
}


//Delete function
UI.prototype.deleteItem = function(target){
    //if class name of targeted element is 'delete' ..
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }
}
//Quantity changed function
UI.prototype.quantityChange = function(target){
    console.log('changed');
}
//Array of shopping items
const dresses = [
    {name:'Dress 1', price: 2500, img: '/imgs/item1.jpg'},
    {name:'Dress 2', price: 7500, img: '/imgs/item2.jpg'},
    {name:'Dress 3', price: 2500, img: '/imgs/item3.jpg'},
    {name:'Dress 4', price: 5000, img: '/imgs/item4.jpg'},

];
 
 //UI for showing and exiting from cart
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

//Event Listener for add to cart
 //   var addBtns = document.getElementsByClassName('addBtns');
 
 document.getElementById('content').addEventListener('click', function(e){

    const ui = UI();
    ui.addToCart(e.target);

 });





// Event Listener for delete
document.getElementById('shop-list').addEventListener('click', function(e){

    // Instantiate UI
    const ui = new UI();
  
    // Delete book
    ui.deleteItem(e.target);
    e.preventDefault();
  });
//Event listener for quantity change
document.getElementById('shop-list').addEventListener('change', function(e){
    const ui = new UI();

    ui.quantityChange(e.target);
})