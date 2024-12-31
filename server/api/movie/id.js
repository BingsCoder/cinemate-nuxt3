export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const { id } = getQuery(event);

  const data = await $fetch(`/movie/${id}`, {
    method: "get",
    baseURL: config.public.tmdbBaseUrl,
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + config.public.tmdbAccessToken,
    },
    query: {
      language: "zh-CN",
      append_to_response: "credits",
    },
  });
  return data;
});
