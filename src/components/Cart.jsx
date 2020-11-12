
import React, { Component } from 'react';
import formatCurrency from '../util';

class Cart extends Component {
    render() {
        const { cardItems } = this.props;
        return (
            <>
                <div>
                    {cardItems.length === 0 ?
                        <div className="cart cart-header">Cart is empty!</div> :
                        <div className="cart cart-header">You have {cardItems.length} in the cart{" "}</div>
                    }
                    <div>
                        <div className="cart">
                            <ul className="cart-items">
                                {cardItems.map(item => (
                                    <li key={item._id}>
                                        <div>
                                            <img src={item.image} alt={item.title} />
                                        </div>
                                        <div>
                                            <div>
                                                {item.title}
                                            </div>
                                            <div className="right">
                                                {formatCurrency(item.price)} x {item.count} {" "}
                                                <button className="button" onClick={() => (this.props.removeFromCart(item))}>Remove</button>
                                            </div>
                                        </div>

                                    </li>
                                ))}
                            </ul>
                        </div>
                        {cardItems.length !== 0 &&
                            <div className="cart">
                                <div className="total">
                                    <div>
                                        Total: {" "}
                                        {formatCurrency(
                                            cardItems.reduce((a, c) => a + c.price * c.count, 0)
                                        )}
                                    </div>
                                    <button className="button primary">Proceed</button>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </>
        );
    }
}

export default Cart;