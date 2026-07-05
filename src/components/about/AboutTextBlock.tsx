const AboutTextBlock = () => {
  return (
  <div className="flex flex-col justify-center">
    {/* Eyebrow */}
    <p className="text-primary text-xs tracking-[0.3em] uppercase font-body font-semibold mb-4">
      Learn More
    </p>

    {/* Heading */}
    <h2 className="font-heading text-3xl sm:text-4xl lg:text-[2.75rem] font-light leading-[1.15] mb-6 max-w-lg text-[hsl(222_47%_11%)]">
      A faith-rooted approach to astrology and personal insight.
    </h2>

    {/* Body copy */}
    <div className="space-y-5 text-[hsl(222_20%_30%)] leading-[1.8] text-[0.95rem] max-w-xl">
      <p>
        Welcome to your new journey of revelation and insight. No matter your
        background spiritually, I believe God has something to say to you. My
        name is Luke and I am a Christian astrologer.
      </p>
      <p>
        I believe that God has written the story of each and every one of our
        lives in the stars which can be seen in your natal chart. All that's
        needed is your D.O.B and Time of Birth. The natal chart shows where the
        planets were when you were born. There is a great deal that can be
        learned by the planetary positions, aspects, houses and signs.
      </p>
      <p>
        My philosophy as a Christian astrologer (I know! Rare) is that it is
        Jesus that said there will be signs in the Sun, moon and stars. It's in
        the scripture, so I think it should be noted and understood. God speaks
        through his creation. So I take an approach of Christian
        counseling/advice combined with what God is revealing about your
        individual life in the starry skies.
      </p>
      <p>
        I do not worship the Sun, Moon, or stars. But as the Prophets, Sages,
        Patriarchs, and Men of God of old, let us understand God's message to us
        through his creation alongside the holy scriptures he has given us for
        self-edification.
      </p>
    </div>

    {/* Scripture quote */}
    <blockquote className="mt-8 pl-5 border-l-2 border-primary/50 max-w-xl">
      <p className="font-heading italic text-[hsl(222_30%_20%)] text-base leading-relaxed">
        "The heavens declare the glory of God; And the firmament sheweth his
        handywork. Day unto day uttereth speech, And night unto night sheweth
        knowledge."
      </p>
      <cite className="block mt-2 text-xs text-primary tracking-widest font-body not-italic">
        — Psalm 19:1–4
      </cite>
    </blockquote>
  </div>
  );
};

export default AboutTextBlock;
