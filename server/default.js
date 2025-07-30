

import Product from './model/productSchema.js';
import { products } from './constants/product.js';

const DefaultData = async () => {
    try {
        console.log('Starting data import...');
        await Product.deleteMany({});
        console.log('Existing products deleted');
        
        await Product.insertMany(products);
        console.log('Data imported Successfully');
        
    } catch (error) {
        console.log('Data import error: ', error.message);
        console.log('Products will be served from mock data');
    }
}

export default DefaultData;