import AceStreamService from "@/services/AceStreamService";
import { Request, Response } from "express";

class StreamsController {
  public async getPlaybackUrl(req: Request, res: Response) {
    try {
      const contentId: string = req.params.contentId;
      const data = await AceStreamService.fetchPlaybackData(contentId);

      const playbackUrl = data.response.playback_url;

      res.status(200).json({
        success: true,
        playbackUrl,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error,
      });
    }
  }
}

export default new StreamsController();
