import { PlayCircle } from "lucide-react";
import Image from "next/image";
import { MediaPlaceholder } from "@/components/projects/MediaPlaceholder";

export function ProjectGallery({
  images,
  demoVideo,
}: {
  images: string[];
  demoVideo?: string;
}) {
  return (
    <div className="flex flex-col gap-6">
      {images.length === 0 ? (
        <MediaPlaceholder label="Screenshot gallery coming soon" className="h-56 w-full" />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {images.map((src) => (
            <div key={src} className="relative aspect-video overflow-hidden border border-border">
              <Image src={src} alt="" fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
            </div>
          ))}
        </div>
      )}

      {demoVideo ? (
        <a
          href={demoVideo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-fit items-center gap-2 border border-border px-4 py-2.5 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <PlayCircle className="h-4 w-4" aria-hidden />
          Watch Demo Video
        </a>
      ) : (
        <MediaPlaceholder label="Demo video coming soon" className="h-24 w-full" />
      )}
    </div>
  );
}
