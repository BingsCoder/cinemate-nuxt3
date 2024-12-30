export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const { tmdbBaseUrl, tmdbAccessToken } = config.public;

  const data = await $fetch("/trending/movie/week", {
    baseURL: tmdbBaseUrl,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${tmdbAccessToken}`,
    },
    query: {
      language: "zh-CN",
    },
  });

  return data;
});
