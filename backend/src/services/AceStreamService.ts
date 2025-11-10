type PlaybackData = {
  infohash: string;
  playback_session_id: string;
  playback_url: string;
  stat_url: string;
  command_url: string;
  is_live: 0 | 1;
  is_encrypted: 0 | 1;
  client_session_id: number;
};

type PlaybackResponse = {
  response: PlaybackData;
  error: null | unknown;
};

class AceStreamService {
  private engineUrl: string;
  constructor() {
    this.engineUrl = process.env.ENGINE_URL || "";
  }

  public async fetchPlaybackData(contentId: string) {
    const response = await fetch(
      `${this.engineUrl}/ace/manifest.m3u8?format=json&content_id=${contentId}`
    );

    if (!response.ok)
      throw new Error(`Failed to fetch for content ${contentId}`);

    return (await response.json()) as PlaybackResponse;
  }
}

export default new AceStreamService();
