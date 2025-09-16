import { z } from 'zod';


export const videoUrlRegex = new RegExp(
  [
    // YouTube (watch, short, embed, youtu.be)
    '(https?:\\/\\/)?(www\\.)?(youtube\\.com\\/watch\\?v=|youtube\\.com\\/shorts\\/|youtube\\.com\\/embed\\/|youtu\\.be\\/)[\\w-]{11}',
    // Vimeo
    '(https?:\\/\\/)?(www\\.)?vimeo\\.com\\/\\d+',
    // Dailymotion
    '(https?:\\/\\/)?(www\\.)?dailymotion\\.com\\/video\\/\\w+',
    // Facebook (watch, video, story.php, video.php)
    '(https?:\\/\\/)?(www\\.)?facebook\\.com\\/(watch\\/\\?v=\\d+|story\\.php\\?story_fbid=\\d+|video\\.php\\?v=\\d+|.+\\/videos\\/\\d+)',
    // TikTok
    '(https?:\\/\\/)?(www\\.)?tiktok\\.com\\/@[\\w.-]+\\/video\\/\\d+',
    // Instagram (Reels/TV)
    '(https?:\\/\\/)?(www\\.)?instagram\\.com\\/(reel|tv)\\/[^/]+',
    // Twitch
    '(https?:\\/\\/)?(www\\.)?twitch\\.tv\\/videos\\/\\d+',
    // Loom
    '(https?:\\/\\/)?(www\\.)?loom\\.com\\/share\\/[^/]+',
    // Wistia
    '(https?:\\/\\/)?(fast\\.)?wistia\\.(com|net)\\/medias\\/[^/]+',
  ].join('|'),
  'i'
);

const ACCEPTED_FILE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'application/pdf',
];

const fileSchema = z
  .instanceof(File)
  .refine((file) => ACCEPTED_FILE_TYPES.includes(file.type), {
    message: 'Only .jpg, .jpeg, .png or .pdf files are allowed',
  });

export const lawyerSettingsMediaFormSchema = z.object({
  videos: z
    .array(
      z.object({
        url: z.string().regex(videoUrlRegex, {
          message: 'Please enter a valid video URL(YouTube, Vimeo, etc.)',
        }),
      })
    )
    .optional(),
  // photos: z.array(fileSchema),
  photos: z.any(),
});




const extractYouTubeId = (url) => {
  if (!url) return null;
  const regExp =
    /(?:youtube\.com\/(?:.*v=|(?:v|embed|shorts)\/)|youtu\.be\/)([\w-]{11})/;
  const match = url.match(regExp);
  return match?.[1] ?? null;
};

export const getEmbedUrl = (url) => {
  if (!url) return null;

  // YouTube
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    const videoId = extractYouTubeId(url);
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  }

  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  }

  // TikTok
  const tiktokMatch = url.match(/tiktok\.com\/@[\w.-]+\/video\/(\d+)/);
  if (tiktokMatch) {
    return `https://www.tiktok.com/embed/${tiktokMatch[1]}`;
  }

  // Twitch
  if (url.includes('twitch.tv/videos')) {
    const twitchMatch = url.match(/twitch\.tv\/videos\/(\d+)/);
    if (twitchMatch) {
      const domain =
        typeof window !== 'undefined'
          ? window.location.hostname
          : 'yourdomain.com'; // fallback for SSR
      return `https://player.twitch.tv/?video=${twitchMatch[1]}&parent=${domain}`;
    }
  }

  // Loom
  const loomMatch = url.match(/loom\.com\/share\/([\w-]+)/);
  if (loomMatch) {
    return `https://www.loom.com/embed/${loomMatch[1]}`;
  }

  // Wistia
  const wistiaMatch = url.match(/wistia\.com\/medias\/([\w]+)/);
  if (wistiaMatch) {
    return `https://fast.wistia.com/embed/medias/${wistiaMatch[1]}`;
  }

  // Facebook
  if (
    url.includes('facebook.com/story.php') ||
    url.includes('facebook.com/video.php') ||
    url.includes('facebook.com/watch/')
  ) {
    return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
      url
    )}`;
  }

  // Unsupported or invalid
  return null;
};

