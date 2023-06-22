import fetch from "node-fetch";

const _fetch = (url, method = "GET", { body, headers } = {}) =>
  fetch(url, {
    method,
    body,
    headers,
  }).then((res) => res.json());

const fetchProducts = async () =>
  _fetch("https://api.escuelajs.co/api/v1/products?offset=1&limit=10");

const fetchRate = async (curr) =>
  _fetch("https://api.exchangerate.host/latest?base=USD").then(
    (res) => res.rates[curr]
  );

const createProduct = async (product) => {
  return _fetch("https://api.escuelajs.co/api/v1/products/", "POST", {
    body: JSON.stringify(product),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const getProductById = async (id) => {
  return _fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
};

const updateProductById = async (productId, updatedProduct) => {
  return _fetch(
    `https://api.escuelajs.co/api/v1/products/${productId}`,
    "PUT",
    {
      body: JSON.stringify(updatedProduct),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

const deleteProductById = async (productId) => {
  return _fetch(
    `https://api.escuelajs.co/api/v1/products/${productId}`,
    "DELETE"
  );
};

export {
  fetchProducts,
  fetchRate,
  createProduct,
  getProductById,
  updateProductById,
  deleteProductById,
};
