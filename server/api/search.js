export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  const { q, page = 1 } = getQuery(event);

  if (q.trim().length === 0) {
    return;
  }

  function groupArrayBy(array, by) {
    return array.reduce((acc, obj) => {
      // Get the department value from the current object
      const dept = obj[by];

      // If the department is not yet a key in the accumulator, add it
      if (!acc[dept]) {
        acc[dept] = [];
      }

      // Push the current object into the array for this department
      acc[dept].push(obj);

      return acc;
    }, {}); // Start with an empty object as the accumulator
  }

  const response = await $fetch("/search/multi", {
    baseURL: config.public.tmdbBaseUrl,
    method: "get",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${config.public.tmdbAccessToken}`,
    },
    query: {
      language: "zh-CN",
      page: page,
      query: q,
    },
  });

  const trimmedResults = groupArrayBy(response.results, "media_type");

  return {
    movie: trimmedResults.movie,
    tv: trimmedResults.tv,
    total: response.total_pages,
  };
});
