document.addEventListener("DOMContentLoaded", () => {
  const productList = document.querySelector("#productList");
  const maxPriceSelect = document.querySelector("#maxPrice");

  const params = new URLSearchParams(window.location.search);
  const featuredFilter = params.get("featured");

  function matchesFeaturedFilter(product, filterValue) {
    if (!filterValue) return true;

    const title = product.title.toLowerCase();
    const description = product.description.toLowerCase();
    const tags = (product.tags || []).join(" ").toLowerCase();

    if (filterValue === "nail") {
      return (
        title.includes("nail") ||
        description.includes("nail") ||
        tags.includes("nail")
      );
    }

    if (filterValue === "mascara") {
      return (
        title.includes("mascara") ||
        description.includes("mascara") ||
        tags.includes("mascara")
      );
    }

    if (filterValue === "lipstick") {
      return (
        title.includes("lipstick") ||
        description.includes("lipstick") ||
        tags.includes("lipstick")
      );
    }

    return true;
  }

  async function fetchProducts(maxPrice = 15) {
    productList.innerHTML = "<p>Loading products...</p>";

    try {
      const response = await fetch(
        "https://dummyjson.com/products/category/beauty",
      );

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data = await response.json();

      const filteredProducts = data.products
        .filter((product) => product.price <= maxPrice)
        .filter((product) => matchesFeaturedFilter(product, featuredFilter))
        .sort((a, b) => a.price - b.price);

      if (filteredProducts.length === 0) {
        productList.innerHTML = "<p>No products found in this price range.</p>";
        return;
      }

      productList.innerHTML = "";

      filteredProducts.forEach((product) => {
        const article = document.createElement("article");
        article.classList.add("product-card");

        article.addEventListener("click", () => {
          window.location.href = `product.html?id=${product.id}`;
        });

        article.innerHTML = `
          <img src="${product.thumbnail}" alt="${product.title}">
          <div class="product-content">
            <h3>${product.title}</h3>
            <p class="brand">${product.brand || "Unknown brand"}</p>
            <p class="price">$${product.price.toFixed(2)}</p>
            <p class="rating">Rating: ${product.rating} / 5</p>
            <p class="description">${product.description}</p>
          </div>
        `;

        productList.appendChild(article);
      });
    } catch (error) {
      console.error("Error fetching products:", error);
      productList.innerHTML =
        "<p>Something went wrong while loading products.</p>";
    }
  }

  if (maxPriceSelect) {
    maxPriceSelect.addEventListener("change", () => {
      fetchProducts(Number(maxPriceSelect.value));
    });
  }

  fetchProducts();
});
