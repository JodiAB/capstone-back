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
};