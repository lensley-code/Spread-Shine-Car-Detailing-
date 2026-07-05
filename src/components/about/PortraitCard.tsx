import lukePortrait from "@/assets/luke-portrait.jpeg";

const PortraitCard = () => (
  <div className="relative flex items-center justify-center">
    <div className="relative z-10 w-full max-w-[420px]">
      <div
        className="relative overflow-hidden rounded-2xl border border-primary/20"
        style={{
          boxShadow: "0 16px 48px -12px rgba(0,0,0,0.15), 0 4px 16px -4px rgba(0,0,0,0.1)",
        }}
      >
        <img
          src={lukePortrait}
          alt="Luke — Christian Astrologer"
          className="w-full h-auto object-cover aspect-[3/4] object-[50%_15%]"
          loading="lazy"
        />
      </div>
    </div>
  </div>
);

export default PortraitCard;
