import express from "express";
import dotenv from "dotenv";
import userRoutes from "./src/routes/userRoute.js";
import expenseRoutes from "./src/routes/expenseRoute.js";
import typeRoute from "./src/routes/typeRoute.js";
import { requestLogger, errorLogger } from "./src/configs/logger.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use(requestLogger);
app.use("/users", userRoutes);
app.use("/expenses", expenseRoutes);
app.use("/types", typeRoute);

app.use(errorLogger);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
