import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";
import path from "path";

dotenv.config();

console.log(
  "Environment Variables Loaded",
  process.env.MONGO_URI ? "Successfully" : "Not Found"
);
const PORT = process.env.PORT || 5000;

const app = express();

const __dirname = path.resolve();

app.use(express.json()); // Middleware to parse JSON bodies
app.use("/api/products", productRoutes); // Use product routes

// Serve static files from the React frontend app
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log("Server is running on http://localhost:" + PORT);
});
