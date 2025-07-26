import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "All fields are required" };
    }
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      set((state) => ({
        products: [...state.products, data.data],
      }));
      return { success: true, message: "Product created successfully" };
    } catch (error) {
      console.error("Error creating product:", error);
      return { success: false, message: "Failed to create product" };
    }
  },
  fetchProducts: async () => {
    try {
      const response = await fetch("/api/products");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      set({ products: data.data });
      return { success: true };
    } catch (error) {
      console.error("Error fetching products:", error);
      return { success: false, message: "Failed to fetch products" };
    }
  },
  deleteProduct: async (productId) => {
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // update the ui immediately,  without needing to refetch
      set((state) => ({
        products: state.products.filter((product) => product._id !== productId),
      }));
      return { success: true, message: "Product deleted successfully" };
    } catch (error) {
      console.error("Error deleting product:", error);
      return { success: false, message: "Failed to delete product" };
    }
  },
  updateProduct: async (pid, updatedProduct) => {
    try {
      const response = await fetch(`/api/products/${pid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(updatedProduct),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      //updating ui immediately, without needing to refetch
      set((state) => ({
        products: state.products.map((products) =>
          products._id === pid ? data.data : products
        ),
      }));
      return { success: true, message: "Product updated successfully" };
    } catch (error) {
      console.error("Error updating product:", error);
      return { success: false, message: "Failed to update product" };
    }
  },
}));
