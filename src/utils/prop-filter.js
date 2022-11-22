export const propFilter = images => {
  return images.map(({ id, largeImageURL, tags, webformatURL }) => ({
    id,
    largeImageURL,
    tags,
    webformatURL,
  }));
};
