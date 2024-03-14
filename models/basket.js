const axios = require('axios');

class Basket {
    constructor() {
        this.items = [];
    }

    addObj(id, productQuan) {
        if (typeof window !== 'undefined') {
            fetch(`${baseUrl}product/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: id, productQuan }),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.status === 200) {
                        this.items.push({ id, productQuan });
                        this.upCart(); // Assuming upCart is a method of the class
                    } else {
                        console.error('Error adding product to cart:', data.error);
                    }
                })
                .catch((error) => {
                    console.error('Error adding product to cart:', error);
                });
        }
    }

    delItem(id) {
        if (typeof window !== 'undefined') {
            fetch(`${baseUrl}product/${id}`, {
                method: 'DELETE',
                // headers: {
                //     'Content-Type': 'application/json',
                // },
                // body: JSON.stringify({id: id}),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.status === 200) {
                        const Index = this.items.findIndex((item) => item.id === id);
                        if (Index !== -1) {
                            this.items.splice(Index, 1);
                        }
                        upCart();
                    } else {
                        console.error('Error removing item from cart:', data.error);
                    }
                });
        }
    }

    getItems() {
        return this.items;
    }
}

module.exports = Basket;
