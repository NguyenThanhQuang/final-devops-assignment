const API_URL = "https://thanhquang.website/api";

document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("productList");
  const productForm = document.getElementById("productForm");
  const searchInput = document.getElementById("searchInput");

  async function fetchProducts(searchTerm = "") {
    try {
      const response = await fetch(`${API_URL}/products?search=${searchTerm}`);
      const products = await response.json();

      productList.innerHTML = "";
      products.forEach((product) => {
        const productDiv = document.createElement("div");
        productDiv.innerHTML = `
                    <strong>${product.name}</strong> - ${product.price} VND <br>
                    <small>${product.description}</small>
                    <button onclick="deleteProduct('${product._id}')">Xóa</button>
                `;
        productList.appendChild(productDiv);
      });
    } catch (error) {
      console.error("Lỗi fetch sản phẩm:", error);
      productList.innerHTML = "Không thể tải sản phẩm.";
    }
  }

  window.deleteProduct = async function (id) {
    if (confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
      try {
        await fetch(`${API_URL}/products/${id}`, { method: "DELETE" });
        fetchProducts(searchInput.value);
      } catch (error) {
        console.error("Lỗi xóa sản phẩm:", error);
      }
    }
  };

  productForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const description = document.getElementById("description").value;

    try {
      await fetch(`${API_URL}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, price, description }),
      });
      productForm.reset();
      fetchProducts(searchInput.value);
    } catch (error) {
      console.error("Lỗi thêm sản phẩm:", error);
    }
  });

  searchInput.addEventListener("input", () => {
    fetchProducts(searchInput.value);
  });

  fetchProducts();
});
