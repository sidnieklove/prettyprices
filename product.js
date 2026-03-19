document.addEventListener("DOMContentLoaded", () => {
  const productDetail = document.querySelector("#productDetail");
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");

  async function fetchProduct() {
    productDetail.innerHTML = "<p>Loading product...</p>";

    try {
      if (!productId) {
        productDetail.innerHTML = "<p>Product not found.</p>";
        return;
      }

      const response = await fetch(
        `https://dummyjson.com/products/${productId}`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const product = await response.json();

      const stockText =
        product.stock > 20
          ? "In stock"
          : product.stock > 0
            ? "Low stock"
            : "Out of stock";

      productDetail.innerHTML = `
        <article class="detail-card">
          <div class="detail-image">
            <img src="${product.thumbnail}" alt="${product.title}">
          </div>

          <div class="detail-content">
            <p class="detail-category">${product.category}</p>
            <h1>${product.title}</h1>

            <div class="detail-meta">
              <p class="brand">${product.brand || "Unknown brand"}</p>
              <p class="price">$${product.price.toFixed(2)}</p>
            </div>

            <div class="detail-info-row">
              <span class="info-pill">Rating: ${product.rating} / 5</span>
              <span class="info-pill">${stockText}</span>
            </div>

            <p class="description">${product.description}</p>

            <a href="products.html" class="cta-button detail-button">Continue shopping</a>
          </div>
        </article>
      `;
    } catch (error) {
      console.error("Error fetching product:", error);
      productDetail.innerHTML =
        "<p>Something went wrong while loading the product.</p>";
    }
  }

  fetchProduct();
});
