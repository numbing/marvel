import { ComicVineImage } from '../api/types';

type ImageType = 'cover' | 'thumbnail' | 'avatar';

export const getImageUrl = (
  image: ComicVineImage | undefined | null,
  type: ImageType
): string | null => {
  if (!image) {
    return null;
  }

  const priorities: Record<ImageType, (keyof ComicVineImage)[]> = {
    cover: ['original_url', 'screen_large_url', 'medium_url', 'small_url'],
    thumbnail: ['small_url', 'thumb_url', 'icon_url', 'screen_large_url'],
    avatar: ['medium_url', 'screen_large_url', 'small_url', 'thumb_url', 'icon_url'],
  };

  for (const key of priorities[type]) {
    const url = image[key];
    if (url && typeof url === 'string') {
      return url;
    }
  }

  return null;
};
