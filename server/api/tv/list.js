export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const { path, page = 1 } = getQuery(event);

  console.log("query is", path, page);

  const data = await $fetch(`/tv/${path}`, {
    method: "get",
    baseURL: config.public.tmdbBaseUrl,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${config.public.tmdbAccessToken}`,
    },
    query: {
      language: "zh-CN",
      page: page,
    },
  });

  return data;
});
