import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Data from './product/Data';

const Homepage = () => {
  const [Product, setProduct] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then(res => res.json())
      .then(data => {
        setProduct(data);
      })
      .catch(error => console.error("Error fetching products:", error));
  }, []);

  // Filter products based on search query
  const filteredProducts = Product.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
  };

  return (
    <div className="bg-light min-vh-100">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#003166' }}>
        <div className="container-fluid">
          <Link to="/" className="navbar-brand logo text-uppercase" id='logo'>Siazo</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link">About</Link>
              </li>
            </ul>
            <form className="d-flex" onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-control me-2"
              />
              <button className="btn btn-outline-light" type="submit">Search</button>
            </form>
            <div className="text-white ms-3">Sign In</div>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <h1 className="text-center mb-4 welcome-title">Welcome to Our Store</h1>
        <div className="row">
          {/* Run Fetch data in loop */}
          {filteredProducts.length !== 0 ? (
            filteredProducts.map((item) => (
              <div key={item.id} className="col-md-3 col-sm-6 mb-4">
                <div className="card h-100 border-primary" style={{ borderWidth: '2px' }}>
                  <Link to={'/data/' + item.id}>

                  <Data/>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="card-img-top img-fluid" // Added img-fluid for responsiveness
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <div className="card-body d-flex flex-column align-items-center">
                      <h5 className="card-title text-primary">{item.name}</h5>
                      <p className="card-text text-muted">Category: {item.category}</p>
                      <p className="card-text font-weight-bold">${item.price}</p>
                      <p className={`card-text ${item.stock > 0 ? 'text-success' : 'text-danger'}`}>
                        {item.stock > 0 ? 'In Stock' : 'Out of Stock'}
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No Products Available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
