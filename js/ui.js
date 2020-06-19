class UI {
    find(x, addItemFunction, target) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'shop.json', true);
    
        xhr.onload = function(){
            if(this.status === 200){
                const itemsArray = JSON.parse(this.responseText);
                for(let i = 0; i < itemsArray.length;  i++){
                    if(itemsArray[i].id == x){
                        addItemFunction(itemsArray[i], target)
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
                                <img src="imgs/${item.src}" class="image">
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
            //ERROR! RETURNS ITEM AS UNDEFINED. BUT FIND(X) WORKS FINE.
            var x = target.id;
            this.find(x, this.addTheItem, target);
        }
        // if(target.classList.contains('bg-danger')){
        //     // alert('ALREADY ADDED. DELETE FROM CART TO REMOVE')
        // }
    }

    reloadAddToCart(item){
        if(item){
            var target = document.getElementById(item.id);
            this.addTheItem(item, target);
        }
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
        ui.added_alert()
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
    
    added_alert(){
        // alert('SUCCESSFULLY ADDED')
    }

    deleteItem(target) {
        if (target.classList.contains('delete')){
            target.parentElement.parentElement.remove();

            let object_targeted = target.classList[1];
            Store.removeItem((ui.find(object_targeted)).id)
            //*************buttonChange
        }
    }
    
    quantityChange(target , item) {
        if(target.classList.contains('quantity-input')){
            if (isNaN(target.value) || target.value <= 0) {
            target.value = 1;
            }
            
            return item.price * target.value;

        }
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
            alert('add to cart');
        }
    }
}
