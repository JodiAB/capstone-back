// // authController.js

// import { addUser } from '../models/database.js';
// import bcrypt from 'bcrypt';

// const authController = {
//     register: async (req, res) => {
//         try {
//             const { userName, userLast, userEmail, userPass } = req.body;

//             // Hash the password before storing it in the database
//             const hashedPassword = await bcrypt.hash(userPass, 10);

//             // Add user to the database
//             await addUser(userName, userLast, userEmail, hashedPassword);

//             // Optionally, you can respond with a success message
//             res.status(201).json({ message: 'User registered successfully' });
//         } catch (error) {
//             res.status(500).json({ message: error.message });
//         }
//     },
// };

// export default authController;
