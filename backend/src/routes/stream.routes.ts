import { Router } from "express";
import StreamsController from "@/controllers/StreamsController";

export const streamsRouter = Router();

streamsRouter.get("/streams/:contentId", StreamsController.getPlaybackUrl);
