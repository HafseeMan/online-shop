/**************************************************** */
                //USING ES5 SYNTAX
/**************************************************** */

function item(name, price, amount){
    this.name = name;
    this.price = price;
    this.image = amount;
}

//UI Constructor
function UI() {}

//Add to Cart function
UI.prototype.addToCart = function(event){
    if(target.className === 'addBtn'){
     var card = event.target.parentNode;
     var title = card.getElementsByClassName('itemName')[0].innerText;
     var price = 1000;
     var imgSrc = '/imgs/item1.jpg';
     addItemToCart(imgSrc, title, price)
     
    }

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
    {name:'Dress 1', price: 2500, img: '/imgs/item5.jpg'},
    {name:'Dress 2', price: 7500, img: '/imgs/item2.jpg'},
    {name:'Dress 3', price: 2500, img: '/imgs/item3.jpg'},
    {name:'Dress 4', price: 5000, img: '/imgs/item4.jpg'},
    {name:'Dress 5', price: 2500, img: '/imgs/item2.jpg'},
    {name:'Dress 6', price: 7500, img: '/imgs/item6.jpg'},
    {name:'Dress 7', price: 2500, img: '/imgs/item7.jpg'},
    {name:'Dress 8', price: 5000, img: '/imgs/item8.jpg'},

];
 

//Event Listener for add to cart
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
