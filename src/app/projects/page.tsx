import { Mail, MapPin, Clock, Send, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

// Put your image in /public/mee.png (or change this to mee.jpg if you want)
const PROFILE_SRC = "/mee.jpg";

export const metadata: Metadata = {
  title: "Contact | Ahmed El Arjoun - Web Developer",
  description:
    "Get in touch with Ahmed El Arjoun for web development projects, collaborations, and opportunities. Based in Rabat, Morocco.",
  keywords: [
    "Contact Ahmed El Arjoun",
    "Hire Web Developer Morocco",
    "React Developer Contact",
    "Next.js Developer Contact",
    "Web Developer Consultation",
    "Freelance Web Developer",
    "Work with Ahmed",
    "JavaScript Developer for Hire",
  ],
  robots: "index, follow",
  openGraph: {
    images: ["/og.png"],
    title: "Contact | Ahmed El Arjoun - Web Developer",
    description:
      "Get in touch with Ahmed El Arjoun for web development projects, collaborations, and opportunities. Based in Rabat, Morocco.",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.png"],
    title: "Contact | Ahmed El Arjoun - Web Developer",
    description:
      "Get in touch with Ahmed El Arjoun for web development projects, collaborations, and opportunities. Based in Rabat, Morocco.",
  },
  themeColor: "#06140f",
};

const Contact = () => {
  return (
    <main className="relative mx-auto w-full max-w-7xl px-4 md:px-8 lg:px-12">
      {/* HERO */}
      <section className="py-16 md:py-20 lg:py-24 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-16 right-10 w-44 h-44 bg-emerald-200/35 dark:bg-emerald-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-16 left-6 w-36 h-36 bg-emerald-300/25 dark:bg-emerald-300/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-emerald-200/25 dark:bg-emerald-200/10 rounded-full blur-2xl" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-16">
          {/* TEXT */}
          <div className="text-center lg:text-left space-y-7">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
              <span className="bg-gradient-to-r from-emerald-700 to-emerald-900 dark:from-emerald-300 dark:to-emerald-200 bg-clip-text text-transparent">
                Get In
              </span>{" "}
              <span className="text-gray-900 dark:text-white">Touch</span>
              <span className="text-emerald-700 dark:text-emerald-300">.</span>
            </h1>

            <p className="text-gray-700 dark:text-gray-200 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Ready to bring your ideas to life? {`Let's`} collaborate on your
              next project. {`I'm`} here to help you create{" "}
              <span className="text-emerald-800 dark:text-emerald-300 font-semibold">
                modern, clean, and user-friendly
              </span>{" "}
              experiences.
            </p>

            {/* Highlights */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              {["Quick Response", "Free Consultation", "Flexible Pricing"].map(
                (t) => (
                  <span
                    key={t}
                    className="
                      px-4 py-2 rounded-full text-sm font-medium
                      bg-emerald-50 text-emerald-900 border border-emerald-200
                      dark:bg-emerald-500/10 dark:text-emerald-200 dark:border-emerald-400/20
                      transition-colors
                    "
                  >
                    {t}
                  </span>
                )
              )}
            </div>

            {/* Contact cards */}
            <div className="space-y-4">
              {/* Email */}
              <Link
                href="mailto:ahmed.elarjoun49@gmail.com"
                className="
                  group flex items-center gap-4 p-4 rounded-xl border
                  bg-white/90 border-gray-200 shadow-sm hover:shadow-md
                  dark:bg-white/5 dark:border-white/10 dark:shadow-none
                  transition-all
                "
              >
                <div className="p-3 bg-emerald-100 dark:bg-emerald-400/10 rounded-lg">
                  <Mail className="w-6 h-6 text-emerald-700 dark:text-emerald-300" />
                </div>
                <div className="text-left min-w-0">
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                    Email
                  </p>
                  <p className="text-gray-900 dark:text-white font-semibold break-all">
                    ahmed.elarjoun49@gmail.com
                  </p>
                </div>
              </Link>

              {/* Location */}
              <div
                className="
                  flex items-center gap-4 p-4 rounded-xl border
                  bg-white/90 border-gray-200 shadow-sm
                  dark:bg-white/5 dark:border-white/10 dark:shadow-none
                  transition-colors
                "
              >
                <div className="p-3 bg-emerald-100 dark:bg-emerald-400/10 rounded-lg">
                  <MapPin className="w-6 h-6 text-emerald-700 dark:text-emerald-300" />
                </div>
                <div className="text-left">
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                    Location
                  </p>
                  <p className="text-gray-900 dark:text-white font-semibold">
                    Rabat, Morocco
                  </p>
                </div>
              </div>

              {/* Availability */}
              <div
                className="
                  flex items-center gap-4 p-4 rounded-xl border
                  bg-white/90 border-gray-200 shadow-sm
                  dark:bg-white/5 dark:border-white/10 dark:shadow-none
                  transition-colors
                "
              >
                <div className="p-3 bg-green-100 dark:bg-green-400/10 rounded-lg">
                  <Clock className="w-6 h-6 text-green-700 dark:text-green-300" />
                </div>
                <div className="text-left">
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                    Availability
                  </p>
                  <p className="text-gray-900 dark:text-white font-semibold">
                    Open for freelance & internships
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* IMAGE */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              <div className="absolute -inset-3 rounded-full bg-emerald-300/25 dark:bg-emerald-700/15 blur-2xl" />
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-emerald-300 dark:border-emerald-800 shadow-xl">
                <Image
                  src={PROFILE_SRC}
                  alt="Ahmed El Arjoun - Web Developer"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 288px, (max-width: 1024px) 320px, 384px"
                />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-700 dark:bg-emerald-300 rounded-full" />
              <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-emerald-500 dark:bg-emerald-200 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 md:py-14">
        <div
          className="
            rounded-2xl p-6 sm:p-8 lg:p-12 border
            bg-gradient-to-r from-emerald-50 to-gray-50 border-emerald-200
            dark:from-white/5 dark:to-white/0 dark:border-white/10
            transition-colors
          "
        >
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <MessageCircle className="w-8 h-8 text-emerald-700 dark:text-emerald-300" />
              <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 dark:text-white">
                {`Let's`} Start Your Project
              </h2>
            </div>

            <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg mb-8 max-w-2xl mx-auto">
              Whether you have a specific project in mind or just want to
              discuss possibilities, {`I'm`} here to help. {`Let's`} create
              something amazing together!
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link
                href="mailto:ahmed.elarjoun49@gmail.com"
                className="
                  group px-8 py-4 rounded-xl font-semibold
                  bg-emerald-800 hover:bg-emerald-900 text-white
                  dark:bg-emerald-500 dark:hover:bg-emerald-400 dark:text-emerald-950
                  transition
                  inline-flex items-center justify-center gap-2
                "
              >
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                Send Message
              </Link>

            
              <Link
                href="/cv1.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  px-8 py-4 rounded-xl font-semibold
                  border-2 border-gray-300 text-gray-900 hover:border-emerald-700 hover:text-emerald-800
                  dark:border-white/15 dark:text-gray-100 dark:hover:border-emerald-400/40 dark:hover:text-emerald-200
                  transition
                  inline-flex items-center justify-center
                "
              >
                Download Resume
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
