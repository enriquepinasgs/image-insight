import imageService from "@/services/image-insight";
import { useMutation } from "@tanstack/react-query";

const DEFAULT_CACHED_TIME = 1000 * 15 * 60; //15 mins

const DEFAULT_QUERY_OPTIONS = {
  staleTime: DEFAULT_CACHED_TIME,
  refetchOnWindowFocus: false,
};

const useGetImageInsight = () => {
  return useMutation({
    ...DEFAULT_QUERY_OPTIONS,
    mutationFn: ({
      imageUrl,
      language,
      apiKey,
    }: {
      imageUrl: string;
      language: string;
      apiKey: string;
    }) => imageService.getImageInsight(imageUrl, language, apiKey),
  });
};

export { useGetImageInsight };
