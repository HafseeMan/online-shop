class UI {
    addToCart(item){
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
    }
    check_for_in_store(item){
        let store_memory = JSON.parse(window.localStorage.getItem("store_items"));
        for(let i = 0; i<store_memory.length; i++){
            if(store_memory === []){
                console.log("store empty")
                return true;
            } else if (store_memory[i].id === item.id) {
                console.log("in store")
                return false;
            } else {
                console.log("new entry")
                return true;
            }
        }
    }
    deleteItem(target) {
        if (target.classList.contains('delete')){
            target.parentElement.parentElement.remove();

            let object_targeted = target.classList[1];
            Store.removeItem((find(object_targeted)).id)
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
        document.getElementById("finalPrice").innerHTML = total;
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
