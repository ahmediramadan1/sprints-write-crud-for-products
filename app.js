import express, { json } from "express";
import { productsRoutes } from "./routes/products-routes.js";

const app = express();
app.use(json());

app.use("/products", productsRoutes);

export { app };
