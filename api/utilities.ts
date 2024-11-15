import { generateUID } from '@/src/lib/utilities';
export const normalizeRssArticle = (item: RssItem): FeedItem => {

  // <-- img tag could be nested in description
  const srcMatchDescription = item["description"][0].match(/<img[^>]+src="([^"]+)"/);

  // <-- img tag could be nested in description
  const srcMatchContent = item["content:encoded"]?.[0].match(/<img[^>]+src="([^"]+)"/);


  const existingImg =
    srcMatchDescription?.[1] ??
    srcMatchContent?.[1] ??
    item["media:thumbnail"]?.[0].$.url ??
    item["media:content"]?.[0].$.url;

  return {
    id: String(generateUID(item.link[0])),
    name: item.title[0],
    url: item.link[0],
    imgUrl: existingImg ?? "/favicon.ico",
    articleSrc: "RSS",
  };
};
export const normalizeJSONArticle = (item: JsonItem): FeedItem => {
  return {
    id: String(generateUID(item.url)),
    name: item.title,
    url: item.url,
    imgUrl: item.image,
    articleSrc: "RSS",
  };
};