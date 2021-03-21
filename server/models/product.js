import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  title: {
    type:String,
    required: true,
    trim: true
  },
  price: {
    type:Number,
    required: true,
  },
  quantity: {
    type:Number,
    required: true
  }

}, {timestamps: true})

ProductSchema.set('toJSON', {
  transform: (_, obj) => {
    obj.id = obj._id.toString();
    delete obj.__v;
    delete obj._id;
  }
})


const Product = mongoose.model('product', ProductSchema);

export default Product;