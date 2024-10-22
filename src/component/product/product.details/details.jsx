import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Details = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();

  useEffect(() => {
    fetch("http://localhost:3000/products/" + id)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not OK");
        }
        return response.json();
      })
      .then((data) => {
        setProduct(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, [id]); // Added id to the dependency array

  return (
    <div className="container mt-4"  >
      <div className="row">
        <div className="col-md-6">
          <img
            src={product.image}
            className="img-fluid rounded"
            alt={product.name}
          />
        </div>
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-start">
          <h1 className="text-primary">{product.name}</h1>
          <h2 className="text-success">&#8377;{product.price}</h2>
          <p className="text-muted">{product.description}</p>
          <h5
            className={`mt-3 ${
              product.stock > 0 ? "text-success" : "text-danger"
            }`}
          >
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </h5>
          <button className="btn btn-primary mt-3">Add to Cart</button>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-primary mb-3">Product Specifications</h3>
        <ul className="list-group">
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <span>Brand:</span>
            <span className="font-weight-bold">
              {product.brand || "Unknown"}
            </span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <span>Model:</span>
            <span className="font-weight-bold">
              {product.model || "Unknown"}
            </span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <span>Dimensions:</span>
            <span className="font-weight-bold">
              {product.dimensions || "N/A"}
            </span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <span>Weight:</span>
            <span className="font-weight-bold">{product.weight || "N/A"}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <span>Color:</span>
            <span className="font-weight-bold">{product.color || "N/A"}</span>
          </li>
        </ul>
      </div>

      <div className="mt-4">
        <h3 className="text-primary mb-3">User Reviews</h3>
        <div className="review-item mb-3 p-3 border rounded shadow-sm">
          <strong>John Doe:</strong>
          <p>This product is fantastic! Highly recommend.</p>
        </div>
        <div className="review-item mb-3 p-3 border rounded shadow-sm">
          <strong>Jane Smith:</strong>
          <p>Good value for the price, but the delivery was slow.</p>
        </div>
        <div className="review-item mb-3 p-3 border rounded shadow-sm">
          <strong>Mike Johnson:</strong>
          <p>Great quality, but the color was not as expected.</p>
        </div>
        <button className="btn btn-secondary mt-3">Leave a Review</button>
      </div>

      <div className="mt-4">
        <h3 className="text-primary mb-3">Additional Images</h3>

        <div className="row">
          {product.additionalImages && product.additionalImages.map((img, index) => (
            <div className="col-6 col-md-4 mb-3" key={index}>
              <div className="border rounded overflow-hidden shadow-sm">
                <img
                  src={img}
                  className="img-fluid"
                  alt={`Additional view ${index + 1}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Details;
