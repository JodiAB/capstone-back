import { addToCart, updateCart, getCartUser, removeCart } from '../models/database.js';

const addCart = async (req, res) => {
           const { user_id, product_id, quantity } = req.body;
         
           try {
             // Create a new cart item object
             const cartItem = new CartItem({
               user_id,
               product_id,
               quantity,
             });
         
             // Save the cart item to the database
             await cartItem.save();
         
             res.status(201).json(cartItem); // Respond with the added cart item
           } catch (error) {
             console.error('Error adding item to cart:', error);
             res.status(500).json({ message: 'Error adding item to cart' });
           }
         };
        

         async function updateCartItem(req, res) {
           const { cartItemId, newQuantity } = req.body;
           try {
             const result = await updateCart(cartItemId, newQuantity);
             if (result.success) {
               res.json({ message: 'Cart item quantity updated successfully' });
             } else {
               throw new Error(result.message);
             }
           } catch (error) {
             console.error('Error updating cart item quantity:', error);
             res.status(500).json({ message: 'Error updating cart item quantity' });
           }
         };
         
         // Controller function to get all cart items for a user
         async function getCartItems(req, res) {
           const { userId } = req.params;
           try {
             const result = await getCartUser(userId);
             if (result.success) {
               res.json(result.cartItems);
             } else {
               throw new Error(result.message);
             }
           } catch (error) {
             console.error('Error fetching cart items:', error);
             res.status(500).json({ message: 'Error fetching cart items' });
           }
         };
         
       
         async function removeFromCart(req, res) {
           const { cartItemId } = req.params;
           try {
             const result = await removeCart(cartItemId);
             if (result.success) {
               res.json({ message: 'Item removed from cart successfully' });
             } else {
               throw new Error(result.message);
             }
           } catch (error) {
             console.error('Error removing item from cart:', error);
             res.status(500).json({ message: 'Error removing item from cart' });
           }
         };

         export { addCart, updateCartItem, getCartItems, removeFromCart };