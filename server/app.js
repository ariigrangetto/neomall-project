import express from "express";
import morgan from "morgan";
import "dotenv/config";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoutes.js";
import productsRoutes from "./routes/productRoutes.js";
import cartRoute from "./routes/cartRoutes.js";
import { corsMiddlewares } from "./middlewares/cors.js";

const app = express();
app.use(cookieParser());
app.use(morgan("dev"));

app.use(express.json());
app.use(corsMiddlewares());

app.use("/", userRoute);
app.use("/products", productsRoutes);
app.use("/cart", cartRoute);

app.use((req, res) => {
  res.status(404).send("<h1> 404 - not found </h1>");
});

const PORT = process.env.PORT;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () =>
    console.log(`Servidor escuchando en el puerto: http://localhost:${PORT}`),
  );
}

export default app;
