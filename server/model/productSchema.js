import mongoose from 'mongoose';
import AutoIncrement from 'mongoose-sequence';

const productSchema = new mongoose.Schema({
    id: Number,
    url: String,
    detailUrl: String,
    title: Object,
    price: Object,
    quantity: Number,
    description: String,
    discount: String,
    tagline: String
});

const AutoIncrementPlugin = AutoIncrement(mongoose);
productSchema.plugin(AutoIncrementPlugin, { inc_field: 'id' });

const products = mongoose.model('product', productSchema);

export default products;