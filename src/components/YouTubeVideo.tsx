import { AspectRatio } from "@/components/ui/aspect-ratio";

interface YouTubeVideoProps {
  videoId: string;
  className?: string;
}

export const YouTubeVideo = ({ videoId, className }: YouTubeVideoProps) => {
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&rel=0&modestbranding=1`;

  return (
    <div className={`w-full ${className}`}>
      <AspectRatio ratio={16 / 9}>
        <iframe
          src={embedUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full rounded-lg"
        />
      </AspectRatio>
    </div>
  );
};