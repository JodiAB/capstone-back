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
    const products = await getProducts();
    const updatedProducts = products.filter(product => product.id !== id);
    if (updatedProducts.length === products.length) {
        throw new Error(`Product with id ${id} not found`);
    }
    return updatedProducts;
};

export { getProducts, getProduct, addProduct, upProduct, deleteProduct};
