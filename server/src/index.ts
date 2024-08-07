import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import caseRoutes from "./routes/caseRoutes";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/api/users", userRoutes);
app.use("/api/cases", caseRoutes);

// Define the PORT
const PORT = process.env.PORT || 5000;

// Start the server on the defined PORT
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
