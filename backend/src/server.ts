import express from "express";
import { streamsRouter } from "./routes/stream.routes";

const app = express();

app.use(streamsRouter);

app.listen(3000, () => {
  console.log("Running on http://localhost:3000...");
});
