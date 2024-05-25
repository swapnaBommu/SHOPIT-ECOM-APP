import mongoose from "mongoose";
import products from "./data.js";
import Product from "../models/product.js";
const seedProducts = async () => {
    try {
        await mongoose.connect(
            "mongodb+srv://eshop:SUDHA%408143@shopit.vzy7gq7.mongodb.net/SHOPIT?retryWrites=true&w=majority&appName=shopit"
        );
        
        await Product.deleteMany();
        console.log("Products are deleted");

        await Product.insertMany(products);
        console.log("Products are added");
        process.exit();
    } catch (error) {
        console.log(error.message);
        process.exit();
    }
};

seedProducts();