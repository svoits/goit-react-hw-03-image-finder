export function normalizeHits(hits) {
  return hits.map(({ id, tags, webformatURL, largeImageURL }) => ({
    id,
    tags,
    webformatURL,
    largeImageURL,
  }));
}
