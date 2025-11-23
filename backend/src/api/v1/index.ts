import express from "express";

import userRoutes from "./routes/userRoutes.js";

const apiV1Router = express.Router();

// Mount routes
apiV1Router.use("/users", userRoutes);

export default apiV1Router;
