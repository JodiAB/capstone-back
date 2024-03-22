import { pool } from '../config/config.js'; 




const getProducts = async () => {
    const [result] = await pool.query(`SELECT * FROM product`);
    return result;
}
const getEmail = async (userEmail) => {
    try {
        const [result] = await pool.query('SELECT * FROM users WHERE userEmail = ?', [userEmail]);
        return result.length ? result[0] : null;
    } catch (error) {
        console.error('Error fetching user by email:', error);
        throw error;
    }
};
  

const getProduct = async (id) => {
    const [result] = await pool.query(`SELECT * FROM product WHERE id = ?`, [id]);
    return result;
}

const addProduct = async (productName, productDes, productPrice, productIMG, productQuan) => {
    
    const [product] = await pool.query(`INSERT INTO product (productName, productDes, productPrice, productIMG, productQuan) VALUES (?, ?, ?, ?, ?)`, [ productName, productDes, productPrice, productIMG, productQuan]);
    return getProduct(product.insertId);
}
const upProduct = async (productName, productDes, productPrice, productIMG, productQuan, id) => {
    const [product] = await pool.query(`UPDATE product SET productName = ?, productDes = ?, productPrice =?, productIMG = ?, productQuan = ?  WHERE id = ?`, [productName, productDes, productPrice, productIMG, productQuan, id]);
    return product;
}
const deleteProduct = async (id) => {
    await pool.query(`DELETE FROM product where id = ?`,[id])
    return getProducts
}








const getUser = async (userID) => {
    const [result] = await pool.query(`SELECT * FROM users WHERE userID = ?`, [userID]);
    return result;
}
const getUsers = async() => {
    const [result] = await pool.query(`SELECT * FROM users`);
    return result;
}




const addUser = async (userName, userLast, userEmail, userPass) => {
    try {
      const connection = await pool.getConnection();
      const [result] = await connection.execute(
        'INSERT INTO users (userName, userLast, userEmail, userPass) VALUES (?, ?, ?, ?)',
        [userName, userLast, userEmail, userPass]
      );
      connection.release();
      return result.insertId;
    } catch (error) {
      console.error('Error adding user to database:', error);
      throw error;
    }
  };
const upUser = async (userName, userLast, userEmail, userPass, userID) => {
    const [user] = await pool.query(`UPDATE users SET userName = ?, userLast = ?, userEmail = ?, userPass = ? WHERE userID = ?`, [userName, userLast, userEmail, userPass, userID]);
    return user;
};

const deleteUser = async (userID) => {
    await pool.query(`DELETE FROM users where userID = ?`,[userID])

};


const checkUser = async (userEmail) => {
    try {
        const [rows] = await pool.query('SELECT userPass FROM users WHERE userEmail = ?', [userEmail]);
        if (rows.length > 0) {
            return rows[0].userPass; 
        }
        return null;
    } catch (error) {
        console.error('Error checking user:', error);
        throw new Error('Error checking user');
    }
};
  const addToCart = async (userId, productId, quantity, price, imageUrl) => {
        try {
          const query = `
            INSERT INTO cart (user_id, product_id, quantity, price, image_url)
            VALUES (?, ?, ?, ?, ?)
          `;
          await pool.query(query, [userId, productId, quantity, price, imageUrl]);
          return { success: true, message: 'Item added to cart successfully' };
        } catch (error) {
          console.error('Error adding item to cart:', error);
          return { success: false, message: 'Error adding item to cart' };
        }
      };

      async function updateCart(cartItemId, newQuantity) {
        try {
          const query = `
            UPDATE shopping_cart
            SET quantity = ?
            WHERE cart_item_id = ?
          `;
          await pool.query(query, [newQuantity, cartItemId]);
          return { success: true, message: 'Cart item quantity updated successfully' };
        } catch (error) {
          console.error('Error updating cart item quantity:', error);
          return { success: false, message: 'Error updating cart item quantity' };
        }
      };

// Function to get all cart items for a user
async function getCartUser(userId) {
    try {
      const query = `
        SELECT * FROM shopping_cart
        WHERE user_id = ?
      `;
      const cartItems = await pool.query(query, [userId]);
      return { success: true, cartItems };
    } catch (error) {
      console.error('Error fetching cart items:', error);
      return { success: false, message: 'Error fetching cart items' };
    }
  };

  // Function to remove an item from the cart
async function removeCart(cartItemId) {
    try {
      const query = `
        DELETE FROM shopping_cart
        WHERE cart_item_id = ?
      `;
      await pool.query(query, [cartItemId]);
      return { success: true, message: 'Item removed from cart successfully' };
    } catch (error) {
      console.error('Error removing item from cart:', error);
      return { success: false, message: 'Error removing item from cart' };
    }
  }
  
  


export {
    getProducts,
    getProduct,
    addProduct,
    upProduct,
    deleteProduct,
    addUser,
    deleteUser,
    upUser,
    getUser,
    getUsers,
    checkUser, 
    getEmail,
    addToCart,
    updateCart,
    getCartUser,
    removeCart,

    
};