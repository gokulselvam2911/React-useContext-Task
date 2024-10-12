import { useContext } from 'react';
import { CartContext } from './CartContext';
import { FaPlusCircle, FaMinusCircle, FaTrash } from 'react-icons/fa';

const Cart = () => {
    const { state, dispatch } = useContext(CartContext);

    const handleIncrease = (item) => {
        dispatch({ type: 'ADD_TO_CART', payload: item });
    };

    const handleDecrease = (item) => {
        if (item.quantity > 1) {
            dispatch({ type: 'REMOVE_FROM_CART', payload: item });
        }
    };

    const handleRemove = (item) => {
        dispatch({ type: 'REMOVE_ITEM', payload: item });
    };

    const handleBuyNow = (item) => {
        alert(`Proceeding to buy ${item.title}`);
    };

    const handleBuyAll = () => {
        alert('Proceeding to buy all items');
    };

    return (
        <div className="container mt-5" style={{ backgroundColor: '#f8f9fa' }}>
            <h2>Cart</h2>
            {state.cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <div className="row">
                    {state.cartItems.map((item) => (
                        <div className="col-md-4 mb-4" key={item.id}>
                            <div className="card h-100">
                                <img src={item.image} className="card-img-top" alt={item.title} style={{ height: '200px', objectFit: 'cover' }} />
                                <div className="card-body">
                                    <h5 className="card-title">{item.title}</h5>
                                    <p className="card-text">₹{item.price.toFixed(2)}</p>
                                    <div className="quantity-controls">
                                        <button className="btn btn-secondary" onClick={() => handleDecrease(item)}>
                                            <FaMinusCircle />
                                        </button>
                                        <span className="mx-2">{item.quantity}</span>
                                        <button className="btn btn-secondary" onClick={() => handleIncrease(item)}>
                                            <FaPlusCircle />
                                        </button>
                                    </div>
                                    <button className="btn btn-danger mt-2" onClick={() => handleRemove(item)}>
                                        Remove <FaTrash />
                                    </button>
                                    &nbsp;
                                    &nbsp;
                                    <button className="btn btn-warning mt-2" onClick={() => handleBuyNow(item)}>
                                        Buy Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <div className="text-right">
                <h4>Total Quantity: {state.totalQuantity}</h4>
                <h4>Total Amount: ₹{state.totalAmount.toFixed(2)}</h4>
                <button className="btn btn-success mt-3" onClick={handleBuyAll}>
                    Buy All
                </button>
            </div>
        </div>
    );
};

export default Cart;
