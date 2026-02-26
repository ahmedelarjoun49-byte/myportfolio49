import Link from "next/link";
import { Github, Linkedin, Instagram } from "lucide-react";

const socials = [
  {
    name: "GitHub",
    href: "https://github.com/ahmedelarjoun49-byte",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/ahmed-el-arjoun-639804305/",
    icon: Linkedin,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/el4rjoun",
    icon: Instagram,
  },
];

const SocialsMenu = () => {
  return (
    <div className="flex items-center gap-3">
      {socials.map((social) => {
        const Icon = social.icon;

        return (
          <Link
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.name}
            className="group relative flex h-11 w-11 items-center justify-center rounded-xl
              border border-black/10 bg-white/60 backdrop-blur-md
              transition-all duration-300
              hover:-translate-y-1 hover:shadow-lg
              hover:border-purple-500/40
              dark:border-white/10 dark:bg-zinc-950/60"
          >
            {/* glow */}
            <span
              className="pointer-events-none absolute inset-0 rounded-xl
                bg-purple-500/10 opacity-0 blur-md
                transition-opacity duration-300
                group-hover:opacity-100"
            />

            <Icon
              className="relative z-10 h-5 w-5 text-zinc-700 transition-colors duration-300
                group-hover:text-purple-600
                dark:text-zinc-300 dark:group-hover:text-purple-400"
            />
          </Link>
        );
      })}
    </div>
  );
};

export default SocialsMenu;
