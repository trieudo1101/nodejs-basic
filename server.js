import express from "express";
import dotenv from "dotenv";
import userRoutes from "./src/routes/userRoute.js";
import expenseRoutes from "./src/routes/expenseRoute.js";
import typeRoutes from "./src/routes/typeRoute.js";
import categoryRouters from "./src/routes/categoryRouter.js";
import { requestLogger, errorLogger } from "./src/configs/logger.js";
import configViewEngine from "./src/configs/viewEngine.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

configViewEngine(app);
app.use(requestLogger);
// Using routes
userRoutes(app);
expenseRoutes(app);
typeRoutes(app);
categoryRouters(app);
app.use(errorLogger);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
