import React from "react";

const ProductSelect = ({ products, selectedProductId, onProductChange }) => {
  return (
    <select
      className="form-control"
      value={selectedProductId}
      onChange={onProductChange}
    >
      {products.map((product) => (
        <option key={product.productId} value={product.productId}>
          {product.name}
        </option>
      ))}
    </select>
  );
};

export default ProductSelect;
