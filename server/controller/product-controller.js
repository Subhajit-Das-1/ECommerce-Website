import Product from '../model/productSchema.js';
import { products as mockProducts } from '../constants/product.js';


export const getProducts = async (request, response) => {
    try {
        const products = await Product.find({});
        response.json(products);
    } catch (error) {
        console.log('Database error, using mock data:', error.message);
        // Return mock data if database fails
        response.json(mockProducts);
    }
}

export const getProductById = async (request, response) => {
    try {
        const product = await Product.findOne({ 'id': request.params.id });
        response.json(product);
    } catch (error) {
        console.log('Database error, using mock data:', error.message);
        // Return mock data if database fails
        const mockProduct = mockProducts.find(p => p.id === request.params.id);
        response.json(mockProduct || mockProducts[0]);
    }
}