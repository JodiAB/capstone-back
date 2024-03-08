import mysql from 'mysql2';
import { config } from 'dotenv';

config();

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
}).promise();

const getProducts = async () => {
    const [result] = await pool.query(`SELECT * FROM product`);
    return result;
}

const getUsers = async() => {
    const [result] = await pool.query(`SELECT * FROM users`);
    return result;
}

const getProduct = async (id) => {
    const [result] = await pool.query(`SELECT * FROM product WHERE id = ?`, [id]);
    return result;
}

const getUser = async (id) => {
    const [result] = await pool.query(`SELECT * FROM users WHERE id = ?`, [id]);
    return result;
}

const addProduct = async (productName, productDes, productPrice, productIMG, productQuan) => {

    const [product] = await pool.query(`INSERT INTO product (productName, productDes, productPrice, productIMG, productQuan) VALUES (?, ?, ?, ?, ?)`, [ productName, productDes, productPrice, productIMG, productQuan]);
    return getProduct(product.insertId);
}

const addUser = async (userName, userLast, userEmail, userPass) =>{
    const [user] = await pool.query(`INSERT INTO users (userID, userName, userLast, userEmail, userPass) VALUES (?,?,?,?,?)`, [ userName, userLast, userEmail, userPass]); 
    return getUser(user.insertId);
}

const upProduct = async (productName, productDes, productPrice, productIMG, productQuan, id) => {
    const [product] = await pool.query(`UPDATE product SET productName = ?, productDes = ?, productPrice =?, productIMG = ?, productQuan = ?  WHERE id = ?`, [productName, productDes, productPrice, productIMG, productQuan, id]);
    return product;
}

const upUser = async (userName, userLast, userEmail, userPass, userID) => {
    const [user] = await pool.query(`UPDATE user SET userName = ?, userLast = ?, userEmail = ?, userPass =?  userID =? WHERE userID = ?`, [userName, userLast, userEmail, userPass, userID]);
    return user;
}

const deleteProduct = async (id) => {
    const products = await getProducts();
    const updatedProducts = products.filter(product => product.id !== id);
    if (updatedProducts.length === products.length) {
        throw new Error(`Product with id ${id} not found`);
    }
    return updatedProducts;
};

const deleteUser = async (id) => {
    const users = await getUsers();
    const updatedUsers = users.filter(user => user.userID !== userID);
    if (updatedUsers.length === users.length) {
        throw new Error(`User with id ${userID} not found`);
    }
    return updatedUsers;

};



export { getProducts, getProduct, addProduct, upProduct, deleteProduct, addUser, deleteUser, upUser, getUser, getUsers};
