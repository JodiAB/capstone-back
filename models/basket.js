// // basket.js
// import axios from 'axios';

// export class Basket {
//     constructor() {
//         this.items = [];
//     }

//     addObj(id, productQuan, baseUrl) {
//         axios.post(`${baseUrl}product/${id}`, { id: id, productQuan })
//             .then((response) => {
//                 if (response.status === 200) {
//                     this.items.push({ id, productQuan });
//                     this.upCart(); // Assuming upCart is a method of the class
//                 } else {
//                     console.error('Error adding product to cart:', response.data.error);
//                 }
//             })
//             .catch((error) => {
//                 console.error('Error adding product to cart:', error);
//             });
//     }

//     delItem(id, baseUrl) {
//         fetch(`${baseUrl}product/${id}`, {
//             method: 'DELETE',
//             // headers: {
//             //     'Content-Type': 'application/json',
//             // },
//             // body: JSON.stringify({id: id}),
//         })
//         .then((response) => response.json())
//         .then((data) => {
//             if (data.status === 200) {
//                 const Index = this.items.findIndex((item) => item.id === id);
//                 if (Index !== -1) {
//                     this.items.splice(Index, 1);
//                 }
//                 this.upCart(); // Fixed the call to upCart method
//             } else {
//                 console.error('Error removing item from cart:', data.error);
//             }
//         });
//     }

//     getItems() {
//         return this.items;
//     }

