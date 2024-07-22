import axios from "axios";

class imageInsightService {
  async getImageInsight(imageUrl: string, language: string, apiKey: string) {
    const res = await axios.get(
      `/api/analyze-image?image_url=${imageUrl}&language=${language}`,
      {
        headers: { "X-OpenAI-ApiKey": apiKey },
      }
    );
    return res;
  }
}

const imageService = new imageInsightService();
export default imageService;
