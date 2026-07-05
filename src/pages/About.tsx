import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Award, Sparkles, HandshakeIcon, MapPin } from "lucide-react";
import { setPageSeo } from "@/lib/seo";
import johnnyPortrait from "@/assets/johnny-portrait.png";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const highlights = [
  {
    icon: Award,
    title: "20+ Years of Experience",
    text: "Decades of hands-on automotive and exterior cleaning experience.",
  },
  {
    icon: Sparkles,
    title: "Professional Workmanship",
    text: "Attention to detail on every project, big or small.",
  },
  {
    icon: HandshakeIcon,
    title: "Honest Service",
    text: "Clear communication, fair pricing, and dependable service.",
  },
  {
    icon: MapPin,
    title: "Serving South Florida",
    text: "Proudly helping homeowners and vehicle owners throughout South Florida.",
  },
];

const About = () => {
  useEffect(() => {
    setPageSeo({
      path: "/about",
      title: "About Johnny Jean-Baptist | SoSpreadShine",
      description:
        "Meet Johnny Jean-Baptist, owner of SoSpreadShine — 20+ years of professional auto detailing and exterior property care in South Florida.",
    });
  }, []);

  return (
    <div className="surface-cream min-h-screen">
      <Navbar />

      {/* Hero — Two Column */}
      <section className="pt-28 pb-16 lg:pt-36 lg:pb-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-center">
            {/* Portrait */}
            <motion.div
              className="lg:col-span-2 flex justify-center lg:justify-start"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
              variants={fadeUp}
            >
              <div className="relative w-full max-w-[420px]">
                {/* Soft gold glow */}
                <div
                  aria-hidden="true"
                  className="absolute -inset-5 rounded-[2rem] bg-primary/15 blur-3xl opacity-70"
                />
                <div
                  className="relative overflow-hidden rounded-[2rem] transition-transform duration-500 hover:scale-[1.02] border border-primary/20"
                  style={{ boxShadow: "0 30px 60px -20px rgba(0,0,0,0.25)" }}
                >
                  <img
                    src={johnnyPortrait}
                    alt="Johnny Jean-Baptist — Owner of SoSpreadShine"
                    className="w-full h-auto object-cover aspect-[4/5]"
                    loading="eager"
                  />
                </div>
              </div>
            </motion.div>

            {/* Intro copy */}
            <motion.div
              className="lg:col-span-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0.15}
              variants={fadeUp}
            >
              <p className="text-primary text-xs sm:text-sm tracking-[0.3em] uppercase font-semibold mb-4">
                About the Owner
              </p>
              <h1 className="font-heading font-semibold leading-[1.1] mb-6 text-foreground text-4xl sm:text-5xl lg:text-[3.25rem]">
                Meet Johnny Jean-Baptist
              </h1>
              <p className="max-w-[560px] text-base sm:text-lg text-muted-foreground leading-[1.75]">
                For more than 20 years, Johnny Jean-Baptist has been helping people
                care for one of their biggest investments — their vehicles and homes.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Biography */}
      <section className="py-16 lg:py-24 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
            className="space-y-6 text-base sm:text-lg text-muted-foreground leading-[1.85]"
          >
            <p>
              With years of hands-on experience in automotive detailing, vehicle
              maintenance, mechanical repairs, and exterior property care, Johnny
              believes that quality workmanship, honesty, and attention to detail
              never go out of style.
            </p>
            <p>
              What began as a passion for restoring vehicles has grown into
              SoSpreadShine, a business dedicated to helping customers maintain
              clean, beautiful, and well-cared-for vehicles and properties
              throughout South Florida.
            </p>
            <p>
              Whether he's detailing a family vehicle, pressure washing a driveway,
              cleaning a roof, or performing light automotive maintenance, Johnny
              approaches every project with the same commitment to professionalism
              and customer satisfaction.
            </p>
            <p>
              At SoSpreadShine, every customer is treated with respect, every
              project receives careful attention, and every job is completed with
              pride.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="surface-beige py-16 lg:py-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
            className="text-center mb-12 lg:mb-16"
          >
            <p className="text-primary text-xs sm:text-sm tracking-[0.3em] uppercase font-semibold mb-3">
              Why Customers Trust Johnny
            </p>
            <h2 className="font-heading font-semibold text-foreground text-3xl sm:text-4xl leading-tight">
              Two decades of care, craft, and commitment.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {highlights.map(({ icon: Icon, title, text }, i) => (
              <motion.div
                key={title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0.08 * (i + 1)}
                variants={fadeUp}
                className="group relative rounded-2xl p-6 sm:p-7 bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10"
              >
                <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary group-hover:bg-primary/15 transition-colors">
                  <Icon size={20} strokeWidth={1.75} />
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2 leading-snug">
                  {title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="surface-white py-16 lg:py-24 px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
          >
            <h2 className="font-heading font-semibold text-foreground text-3xl sm:text-4xl lg:text-5xl leading-tight mb-4">
              Ready to Bring Back the Shine?
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto mb-10">
              Whether it's your vehicle or your property, SoSpreadShine is ready
              to help.
            </p>
            <Button
              variant="gold"
              onClick={() => {
                window.location.href = "/#quote";
              }}
              className="rounded-full h-12 px-9 text-sm font-semibold tracking-[0.1em] uppercase"
            >
              Request a Free Quote
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
