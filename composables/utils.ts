export const clickMovie = async (id: number) => {
  await navigateTo(`/movie/${id}`);
};

export const clickTv = async (id: number) => {
  await navigateTo(`/tv/${id}`);
};
