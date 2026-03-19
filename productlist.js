const productList = document.querySelector("#productList");
const maxPriceSelect = document.querySelector("#maxPrice");

async function fetchProducts(maxPrice = 15) {
  productList.innerHTML = "<p>Loader produkter...</p>";

  try {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();

    const filteredProducts = data.products
      .filter(
        (product) => product.category === "beauty" && product.price <= maxPrice,
      )
      .sort((a, b) => a.price - b.price);

    if (filteredProducts.length === 0) {
      productList.innerHTML = "<p>Ingen produkter fundet.</p>";
      return;
    }

    productList.innerHTML = "";

    filteredProducts.forEach((product) => {
      const article = document.createElement("article");
      article.classList.add("product-card");

      article.innerHTML = `
        <img src="${product.thumbnail}" alt="${product.title}">
        <div class="product-content">
          <h2>${product.title}</h2>
          <p class="brand">${product.brand || "Ukendt brand"}</p>
          <p class="price">$${product.price.toFixed(2)}</p>
          <p class="rating">Rating: ${product.rating} / 5</p>
          <p class="description">${product.description}</p>
        </div>
      `;

      productList.appendChild(article);
    });
  } catch (error) {
    console.error("Fejl ved hentning af produkter:", error);
    productList.innerHTML =
      "<p>Der skete en fejl ved hentning af produkter.</p>";
  }
}

maxPriceSelect.addEventListener("change", () => {
  fetchProducts(Number(maxPriceSelect.value));
});

fetchProducts();
