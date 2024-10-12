import { useContext } from 'react';
import { CartContext } from './CartContext';
import products from './products.json'; 
import { FaPlusCircle } from 'react-icons/fa';

const Home = () => {
    const { dispatch } = useContext(CartContext);

    const addToCart = (product) => {
        dispatch({ type: 'ADD_TO_CART', payload: product });
    };

    return (
        <div className="container mt-5" style={{ backgroundColor: '#f8f9fa', paddingTop : 30 }}>
            <div className="row">
                {products.map((product) => (
                    <div className="col-md-4 mb-4" key={product.id}>
                        <div className="card h-100">
                            <img src={product.image} className="card-img-top" alt={product.title} style={{ height: '200px', objectFit: 'cover' }} />
                            <div className="card-body">
                                <h5 className="card-title">{product.title}</h5>
                                <p className="card-text">₹{product.price.toFixed(2)}</p>
                                <p className="card-text">{product.description}</p>
                                <button className="btn btn-primary" onClick={() => addToCart(product)}>
                                    Add to Cart <FaPlusCircle />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
