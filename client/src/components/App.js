import React from "react";

import Header from './Header';
import Products from './Products';
import AddForm from './AddForm';
const App = () => {
	return (
		<div id="app">
			<Header/>
			<main>
				<Products/>
				<AddForm/>
			</main> 
		</div>
	);
};

export default App;

/*
CART:
Header section: page title, cart, total, checkout (button)
Products section:
	- individual products(product name, price, quantity in stock, add to cart button, edit button, "X" button),
	- add product button

*/

