class UI {
    find(x, functionToExecute, target) {
        //x is the item to search for
        //functionToExecute is the function to use the output
        //target 

        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'shop.json', true);
        
        xhr.onload = function(){
            if(this.status === 200){
                const itemsArray = JSON.parse(this.responseText);
                for(let i = 0; i < itemsArray.length;  i++){
                    if(itemsArray[i].id == x){
                        functionToExecute(itemsArray[i], target)
                    }
                }
            }
        }
        xhr.send();
    }
    
    loadShopItems(){
        const xhr = new XMLHttpRequest();

        xhr.open('GET', 'shop.json', true);

        xhr.onload = function(){
            if(this.status === 200){
                const items = JSON.parse(this.responseText);
                
                let output = '';
    
                items.forEach(item => {
                    output += `
                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 ">
                    <div class="card card-body text-center mt-5">
                        <h2 class="itemName">${item.name}</h2>
                        <div style="overflow: hidden;" class="square">
                            <img src="imgs/${item.src}" class="image" style="height: 300px; width: 250px;">
                        </div>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </p>
                        <h3>N <span class="price">${item.price}</span></h3>
                        <button class="addBtn bg-success text-light p-2" id="${item.id}">ADD TO CART</button>
                    </div>
                </div>
                    `;
                });
    
                document.getElementsByClassName('row')[0].innerHTML = output; 

                Store.displayItems();
            }
        }
    
        xhr.send();
    }

    addToCart(target){
        if(target.classList.contains('addBtn')){
            var x = target.id;
            this.find(x, this.addTheItem, target);
        }

        if(target.classList.contains('addedBtn')){
            var x = target.id;
            this.deleteClickFromShopping(target);
        }
    }

    reloadAddToCart(item){
        if(item){
            var target = document.getElementById(item.id);
            this.reloadAddItem(item, target);
        }
    }

    reloadAddItem(item, target){
        var list = document.getElementById('shop-list');
        var newItem = document.createElement('tr');
        var newCartItem = `
                <td><img src='imgs/${item.src}' class="cart-img"></td>
                <td>${item.name}</td>
                <td><input value= '1' class= '${item.id} quantity-input' type='number'></td>
                <td class="item_price">${item.price}</td>
                <td><a href="#" class="delete ${item.id} text-danger" id="${item.id}X">X<a></td>
            
                `

        newItem.innerHTML = newCartItem;
        list.append(newItem)
        ui.updateCartTotal()
        ui.buttonChange(target)
    }

    addTheItem(item, target){
        var list = document.getElementById('shop-list');
        var newItem = document.createElement('tr');
        var newCartItem = `
                <td><img src='imgs/${item.src}' class="cart-img"></td>
                <td>${item.name}</td>
                <td><input value= '1' class= '${item.id} quantity-input' type='number'></td>
                <td class="item_price">${item.price}</td>
                <td><a href="#" class="delete ${item.id} text-danger">X<a></td>
                `

        newItem.innerHTML = newCartItem;
        list.append(newItem)
        ui.updateCartTotal()
        Store.addItem(item);
        ui.buttonChange(target)
    }

    buttonChange(target){
        //for SUCCESSFULLY ADDING TO CART
        if(target.classList.contains('addBtn')){
            target.classList.replace('addBtn','addedBtn')
            target.classList.replace('bg-success','bg-danger')
           
            target.innerText = 'REMOVE FROM CART'
        }
    }    
    
    //Function that handles click on delete (x) from cart
    deleteClickFromCart(target) {
        if (target.classList.contains('delete')){    

            let id = target.classList[1];
            let target_button = document.getElementById(id);
            Store.removeItem(id);

            target.parentElement.parentElement.remove();
            //(pending) change addtocart button

            this.deleteButtonChange(target_button)
        }
    }

    //Function that handles click on remove from cart (x) from the shopping page
    deleteClickFromShopping(target) {
        this.deleteButtonChange(target)
        Store.removeItem(target.id);

        let target_button = document.getElementById(target.id + "X");
        target_button.parentElement.parentElement.remove();

        this.updateCartTotal();
    }

    deleteButtonChange(target){
        //for SUCCESSFULLY ADDING TO CART
        if(target.classList.contains('addedBtn')){
            target.classList.replace('addedBtn', 'addBtn')
            target.classList.replace('bg-danger', 'bg-success')
           
            target.innerText = 'ADD TO CART'
        }
    }    

    quantityChange(target){
        let itemID = target.classList[0];
        this.find(itemID, quantityTheChange, target);
    }

    quantityTheChange(item, target){
        let newPrice = 0;

        if(target.classList.contains('quantity-input')){
            if (isNaN(target.value) || target.value <= 0) {
            target.value = 1;
            }
            
            newPrice =  item.price * target.value;

        }
        e.target.parentElement.nextSibling.nextSibling.innerHTML = newPrice;
    }

    updateCartTotal() {
        let cart_items_num = document.getElementById("cart-table").rows.length;
        var total = 0;

        for (let i = 1; i < cart_items_num; i++){ //start from i=1 since at i=0 are the table headers
            var x = parseFloat(document.getElementById("cart-table").rows[i].children[3].innerHTML);
            total += x;   
        }
        
        document.getElementById("finalPrice").innerHTML = 'N'+total;
    }

    purchaseClicked() {
        var cartList = document.getElementById('shop-list');
        if(cartList.hasChildNodes()){
            alert('Thank you for your purchase')
    
            //empty the cart
            while (cartList.hasChildNodes()) {
                cartList.removeChild(cartList.firstChild)
            }
        }
        else{
            alert('Add to Cart');
        }
    }
}
