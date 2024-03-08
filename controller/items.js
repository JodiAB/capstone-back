import { getProducts, getProduct, addProduct, upProduct, deleteProduct, addUser, deleteUser, upUser, getUser, getUsers} from '../models/database.js';


export default {
    getMany: async (req, res) => {
        res.send(await getProducts());
    },
   

    postMany: async (req, res) => {
        const { productName, productDes, productPrice, productIMG, productQuan } = req.body;
        await addProduct(productName, productDes, productPrice, productIMG, productQuan);
        res.send(await getProducts());
    },

    

    getFew: async (req, res) => {
        const id = +req.params.id;
        const item = await getProduct(id);
        res.send(item);
    },

   
    deleteMany: async (req, res) => {
        const id = +req.params.id;
        try {
            const updatedProducts = await deleteProduct(id);
            res.json(updatedProducts);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },

    

    patchMany: async (req, res) => {
        const id = +req.params.id;
        const product = await getProduct(id);
        const { productName, productDes, productPrice, productIMG, productQuan } = req.body;
        
        const updatedProductName = productName || product.productName;
        const updatedProductDes = productDes || product.productDes;
        const updatedProductPrice = productPrice || product.productPrice;
        const updatedProductIMG = productIMG || product.productIMG;
        const updatedProductQuan = productQuan || product.productQuan;

        await upProduct(updatedProductName, updatedProductDes, updatedProductPrice, updatedProductIMG, updatedProductQuan, id);
        res.json(await getProducts());
    }

};
