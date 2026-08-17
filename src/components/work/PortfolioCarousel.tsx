import { useCallback, useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { cn } from "@/lib/utils";
import Lightbox, { type LightboxItem } from "./Lightbox";

export type Project = {
  id: string;
  title: string;
  category: "Auto" | "Home";
  label: string;
  image: string;
  beforeImage?: string;
};

type Props = { projects: Project[] };

const ExpandCue = () => (
  <span className="pointer-events-none absolute top-3 right-3 h-7 w-7 rounded-full bg-background/80 text-foreground backdrop-blur flex items-center justify-center opacity-90">
    <Expand size={13} />
  </span>
);

const ProjectCard = ({
  p,
  onOpen,
}: {
  p: Project;
  onOpen: (which: "before" | "after") => void;
}) => (
  <figure className="group">
    <div className="relative overflow-hidden rounded-[22px] aspect-[3/2] bg-muted">
      {p.beforeImage ? (
        <div className="grid grid-cols-2 h-full w-full">
          <button
            type="button"
            aria-label={`View ${p.title} before image larger`}
            onClick={() => onOpen("before")}
            className="relative overflow-hidden cursor-pointer"
          >
            <img
              src={p.beforeImage}
              alt={`${p.title} before`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
            <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-[0.15em] bg-background/85 text-foreground backdrop-blur">
              Before
            </span>
          </button>
          <button
            type="button"
            aria-label={`View ${p.title} after image larger`}
            onClick={() => onOpen("after")}
            className="relative overflow-hidden cursor-pointer"
          >
            <img
              src={p.image}
              alt={`${p.title} after`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
            <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-[0.15em] bg-background/85 text-foreground backdrop-blur">
              After
            </span>
          </button>
          <div className="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-primary/70" />
          <ExpandCue />
        </div>
      ) : (
        <button
          type="button"
          aria-label={`View ${p.title} larger`}
          onClick={() => onOpen("after")}
          className="block h-full w-full cursor-pointer"
        >
          <img
            src={p.image}
            alt={p.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          <ExpandCue />
        </button>
      )}
    </div>
    <figcaption className="pt-4">
      <p className="text-primary text-[10px] font-semibold uppercase tracking-[0.3em]">
        {p.label}
      </p>
      <h3 className="mt-1.5 font-heading text-lg md:text-xl font-medium text-foreground">
        {p.title}
      </h3>
    </figcaption>
  </figure>
);


export default function PortfolioCarousel({ projects }: Props) {
  const [emblaRef, embla] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: false,
  });
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const lightboxItems = useMemo<LightboxItem[]>(
    () =>
      projects.flatMap((p) =>
        p.beforeImage
          ? [
              { src: p.beforeImage, title: p.title, label: p.label, caption: "Before" },
              { src: p.image, title: p.title, label: p.label, caption: "After" },
            ]
          : [{ src: p.image, title: p.title, label: p.label }]
      ),
    [projects]
  );

  const indexFor = useCallback(
    (projectId: string, which: "before" | "after") => {
      let i = 0;
      for (const p of projects) {
        if (p.id === projectId) return p.beforeImage && which === "after" ? i + 1 : i;
        i += p.beforeImage ? 2 : 1;
      }
      return 0;
    },
    [projects]
  );



  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelected(embla.selectedScrollSnap());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    setSnaps(embla.scrollSnapList());
    onSelect();
    embla.on("select", onSelect);
    embla.on("reInit", () => {
      setSnaps(embla.scrollSnapList());
      onSelect();
    });
  }, [embla, onSelect]);

  useEffect(() => {
    embla?.reInit();
  }, [embla, projects]);

  return (
    <div>
      {/* Controls — desktop only */}
      <div className="hidden md:flex justify-end gap-2 mb-6">
        <button
          type="button"
          aria-label="Previous projects"
          onClick={() => embla?.scrollPrev()}
          className="h-11 w-11 rounded-full border border-border/70 text-foreground flex items-center justify-center transition-colors hover:border-primary hover:text-primary"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          aria-label="Next projects"
          onClick={() => embla?.scrollNext()}
          className="h-11 w-11 rounded-full border border-border/70 text-foreground flex items-center justify-center transition-colors hover:border-primary hover:text-primary"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div
        className="overflow-hidden"
        ref={emblaRef}
        role="region"
        aria-label="Completed projects"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") { e.preventDefault(); embla?.scrollNext(); }
          if (e.key === "ArrowLeft") { e.preventDefault(); embla?.scrollPrev(); }
        }}
      >
        <div className="flex -ml-4 md:-ml-6">
          {projects.map((p) => (
            <div
              key={p.id}
              className="pl-4 md:pl-6 shrink-0 grow-0 basis-[86%] sm:basis-[60%] lg:basis-[38%] xl:basis-[34%]"
            >
              <ProjectCard p={p} onOpen={(which) => setLightboxIndex(indexFor(p.id, which))} />
            </div>
          ))}
        </div>
      </div>

      {/* Dots — mobile */}
      <div className="mt-7 flex md:hidden justify-center gap-2">
        {snaps.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to project ${i + 1}`}
            onClick={() => embla?.scrollTo(i)}
            className={cn(
              "h-1.5 rounded-full transition-all",
              i === selected ? "w-5 bg-primary" : "w-1.5 bg-foreground/25"
            )}
          />
        ))}
      </div>

      <Lightbox
        items={lightboxItems}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onIndexChange={setLightboxIndex}
      />
    </div>

  );
}
