//feature 1
import React from 'react'
import { Provider } from 'react-redux';
import Cart from './components/Cart';
import Filter from './components/Filter';
import Products from './components/Products';
import data from './data.json'
import store from "./store";

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      products:data.products,
      cardItems:localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : []
    }
  }

  createOrder = (order) => {
    alert("Need to save order for "+ order.name);
  }

  addToCart = (product) => {
    const cardItems = this.state.cardItems.slice();
    let alreadyInCart = false;
    cardItems.forEach((item) => {
      if (item._id === product._id) {
        item.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      cardItems.push({...product,count:1})
    }
    this.setState({cardItems});
    localStorage.setItem("cartItems", JSON.stringify(cardItems));
  }

  removeFromCart = (product) => {
    const cardItems = this.state.cardItems.slice();
    this.setState({
      cardItems:cardItems.filter(x => x._id !== product._id)
    })
    localStorage.setItem("cartItems", JSON.stringify(cardItems.filter(x => x._id !== product._id)));
 }
  // sortProducts = (event) =>{
  //   const sort = event.target.value;
  //   console.log(event.target.value);
  //   this.setState((state)=>({
  //     sort:sort,
  //     products:state.products.slice().sort((a,b) => sort ==="lowest" 
  //       ? a.price > b.price
  //         ? 1 
  //         : -1
  //       :sort === "highest"
  //       ? a.price < b.price
  //         ? 1
  //         : -1
  //       : a._id > b._id
  //         ? 1
  //         : -1 )
  //   }))
  // }

  // filterProducts = (event) =>{
  //   console.log(event.target.value);
  //   if (event.target.value === "ALL" || event.target.value === "") {
  //     this.setState({
  //       size:event.target.value, 
  //       products:data.products});
  //   }
  //   else{
  //     this.setState({
  //       size:event.target.value,
  //       products:data.products.filter((product) => 
  //         product.availableSizes.indexOf(event.target.value) >= 0
  //       ),
  //     })
  //   }
  // }

  render(){
    return (
      <Provider store={store}>
        <div className="grid-container">
        <header>
          <a href="/">React Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter/>
              <Products addToCart={this.addToCart}/>
            </div>
            <div className="sidebar">
              <Cart 
              cardItems={this.state.cardItems} 
              removeFromCart={this.removeFromCart}
              createOrder={this.createOrder}
              />
            </div>
          </div>
        </main>
        <footer>
          All Right reserved.
        </footer>
      </div>
      </Provider>
    ); 
  }
}

export default App;
