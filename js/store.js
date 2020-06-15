class Store {  //Local storage
    static getItems() {
        let store_items;
        if(localStorage.getItem('store_items') === null) {
        store_items = [];
        } else {
        store_items = JSON.parse(localStorage.getItem('store_items'));
        }

        return store_items;

    }

    static displayItems(){
        const store_items = Store.getItems();

        store_items.forEach(function(item){
          const ui  = new UI;
    
          // Add book to UI
          ui.addToCart(item);
        });
    }

    static addItem(item){
        const store_items = Store.getItems();

        store_items.push(item);

        localStorage.setItem('store_items', JSON.stringify(store_items));
    }

    static removeItem(id){
        const store_items = Store.getItems();

        store_items.forEach(function(item, index){
         if(item.id === id) {
          store_items.splice(index, 1);
         }
        });
    
        localStorage.setItem('store_items', JSON.stringify(store_items));
    }
}
