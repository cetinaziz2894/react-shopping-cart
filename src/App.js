//feature 1
import React from 'react'
import Cart from './components/Cart';
import Filter from './components/Filter';
import Products from './components/Products';
import data from './data.json'

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      products:data.products,
      cardItems:[],
      size:"",
      sort:""
    }
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
  }

  removeFromCart = (product) => {
    const cardItems = this.state.cardItems.slice();
    this.setState({
      cardItems:cardItems.filter(x => x._id !== product._id)

    })

 }
  sortProducts = (event) =>{
    const sort = event.target.value;
    console.log(event.target.value);
    this.setState((state)=>({
      sort:sort,
      products:state.products.slice().sort((a,b) => sort ==="lowest" 
        ? a.price > b.price
          ? 1 
          : -1
        :sort === "highest"
        ? a.price < b.price
          ? 1
          : -1
        : a._id > b._id
          ? 1
          : -1 )
    }))
  }
  


  filterProducts = (event) =>{
    console.log(event.target.value);
    if (event.target.value === "ALL" || event.target.value === "") {
      this.setState({
        size:event.target.value, 
        products:data.products});
    }
    else{
      this.setState({
        size:event.target.value,
        products:data.products.filter((product) => 
          product.availableSizes.indexOf(event.target.value) >= 0
        ),
      })
    }
  }

  render(){
    return (
      <div className="grid-container">
        <header>
          <a href="/">React Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter 
                count={this.state.products.length} 
                size={this.state.size}
                sort={this.state.sort}
                sortProducts={this.sortProducts}
                filterProducts={this.filterProducts}
              />
              <Products products={this.state.products} addToCart={this.addToCart}/>
            </div>
            <div className="sidebar">
              <Cart cardItems={this.state.cardItems} removeFromCart={this.removeFromCart}/>
            </div>
          </div>
        </main>
        <footer>
          All Right reserved.
        </footer>
      </div>
    ); 
  }
}

export default App;
