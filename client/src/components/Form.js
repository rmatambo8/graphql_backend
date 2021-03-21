import React from 'react';
import { useDispatch } from 'react-redux';
import { addProduct, updateProduct } from '../actions/products';
import useField from '../hooks/useField';

const Form = ({ editing, toggleForm, product, handleSubmit }) => {
  const dispatch = useDispatch()
  if (product === undefined) product = {title: "", price: "", quantity: ""}
  const [title, titleReset] = useField(product.title);
  const [price, priceReset] = useField(product.price);
  const [quantity, quantityReset] = useField(product.quantity);
  
  const resetAll = () => {
    titleReset();
    priceReset();
    quantityReset();
    toggleForm();
  }
  const handleProductChange = async event => {
    event.preventDefault();
    const newProduct = { title: title.value, price: Number(price.value), quantity: Number(quantity.value) };
    let response;
    if (editing) {
      newProduct.id = product.id
      response = await dispatch(updateProduct(newProduct))
    } else {
      response = await dispatch(addProduct(newProduct))
    }
    resetAll()
  };

  return (
    <form className="visible">
      <div className="input-group">
          <label htmlFor="product-name">Product Name</label>
        {editing ?
          <input id="product-name" {...title} onChange={title.onChange} /> :
          <input type="text" id="product-name" onChange={title.onChange} name="product-name" />}
      </div>
      <div className="input-group">
        <label htmlFor="product-price">Price</label>
        {editing ?
          <input id="product-price" {...price} onChange={price.onChange}/> :
          <input type="text" id="product-price" name="product-price" onChange={price.onChange} />}
      </div>

      <div className="input-group">
        <label htmlFor="product-quantity">Quantity</label>
        {editing ?
          <input id="product-quantity" {...quantity} onChange={quantity.onChange} /> :
          <input type="text" id="product-quantity" name="product-quantity" onChange={quantity.onChange} />}
      </div>
      <div className="actions form-actions">
        <a href="#" onClick={handleProductChange} className="button">{editing ? "Update" : "Add"}</a>
        <a href="#" onClick={toggleForm} className="button">Cancel</a>
      </div>
    </form>
  )
}

export default Form;
