"use client";

import React, { useState } from "react";
import { Send, Loader2, CheckCircle2, AlertCircle, Copy, Check, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Plus_Jakarta_Sans, Cormorant_Garamond } from "next/font/google";

const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });
const cormorant = Cormorant_Garamond({ weight: ["300", "400"], style: ["italic", "normal"], subsets: ["latin"] });

export default function ContactPage() {
  const [status, setStatus] = useState<"IDLE" | "SENDING" | "SUCCESS" | "ERROR">("IDLE");
  const [copied, setCopied] = useState(false);
  const email = "ahmed.elarjoun49@gmail.com";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("SENDING");
    
    const formData = new FormData(e.currentTarget);
    formData.append("access_key", "63bedcda-fa33-40a7-8ff2-c251a1bbeb2e");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setStatus("SUCCESS");
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setStatus("IDLE"), 4000);
      } else {
        setStatus("ERROR");
      }
    } catch (err) {
      setStatus("ERROR");
    }
  };

  return (
    <div className={`${plusJakarta.className} min-h-screen bg-[#020408] text-white selection:bg-blue-600/30 overflow-x-hidden relative`}>
      
      {/* Background Subtle Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center">
        <div className="w-[50%] h-[50%] rounded-full bg-blue-600/[0.03] blur-[140px]" />
      </div>

      <nav className="fixed top-0 w-full p-8 md:p-12 flex justify-between items-center z-50">
        <Link href="/" className="font-bold text-lg tracking-tighter uppercase text-white">
          EL4RJOUN<span className="text-blue-500">.</span>
        </Link>
      </nav>

      {/* Main Container - Centered Alignment */}
      <main className="relative z-10 max-w-xl mx-auto px-6 pt-44 pb-32 flex flex-col items-center">
        
        {/* Project-Focused Header */}
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-14 text-center"
        >
          <h1 className={`${cormorant.className} text-[11vw] md:text-[5.5vw] font-light leading-[0.9] tracking-tight`}>
            Start a project<span className="text-blue-500">.</span>
          </h1>
          <p className="mt-6 text-sm text-slate-400 font-light leading-relaxed max-w-md mx-auto">
            Have an idea or a vision you want to bring to life? Drop the details below or copy the direct address.
          </p>
        </motion.header>

        {/* Unified Interface Container */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="relative group space-y-8 w-full"
        >
          {/* Card Border Glow Effect */}
          <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          <div className="relative p-6 md:p-8 rounded-2xl bg-[#0a0d14]/30 border border-white/[0.03] backdrop-blur-sm shadow-2xl space-y-8 text-left">
            
            {/* Quick Email Copy Interaction */}
            <div 
              onClick={copyToClipboard}
              className="inline-flex flex-col items-start cursor-pointer group/email"
            >
              <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 mb-1">Direct Address</span>
              <div className="flex items-center gap-2 text-sm font-light text-slate-300 group-hover/email:text-blue-400 transition-colors duration-300">
                <span>{email}</span>
                <div className="w-4 h-4 flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    {copied ? (
                      <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="text-emerald-400">
                        <Check size={12} />
                      </motion.span>
                    ) : (
                      <span className="opacity-40 group-hover/email:opacity-100 transition-opacity">
                        <Copy size={12} />
                      </span>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Project Specification Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Nom complet</label>
                  <input name="name" type="text" required className="w-full bg-[#03060a]/60 border border-white/[0.04] focus:border-blue-500/30 rounded-xl px-4 py-3 outline-none focus:bg-[#03060a]/90 transition-all text-sm text-slate-200 placeholder-slate-800" placeholder="John Doe" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Adresse email</label>
                  <input name="email" type="email" required className="w-full bg-[#03060a]/60 border border-white/[0.04] focus:border-blue-500/30 rounded-xl px-4 py-3 outline-none focus:bg-[#03060a]/90 transition-all text-sm text-slate-200 placeholder-slate-800" placeholder="john@example.com" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Type de projet</label>
                <input name="subject" type="text" required className="w-full bg-[#03060a]/60 border border-white/[0.04] focus:border-blue-500/30 rounded-xl px-4 py-3 outline-none focus:bg-[#03060a]/90 transition-all text-sm text-slate-200 placeholder-slate-800" placeholder="Web App, Design 3D, Branding..." />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Détails du projet</label>
                <textarea name="message" rows={4} required className="w-full bg-[#03060a]/60 border border-white/[0.04] focus:border-blue-500/30 rounded-xl px-4 py-3 outline-none focus:bg-[#03060a]/90 transition-all resize-none text-sm text-slate-200 placeholder-slate-800" placeholder="Décrivez votre vision, vos livrables et vos contraintes..." />
              </div>

              <button 
                type="submit" 
                disabled={status !== "IDLE"}
                className={`w-full py-3.5 rounded-xl text-[10px] font-semibold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 ${
                  status === "SUCCESS" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : 
                  status === "ERROR" ? "bg-red-500/10 text-red-400 border border-red-500/20" : 
                  "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/10"
                }`}
              >
                {status === "IDLE" && <><Send size={11}/> Envoyer la proposition</>}
                {status === "SENDING" && <><Loader2 size={11} className="animate-spin"/> Traitement en cours</>}
                {status === "SUCCESS" && <><CheckCircle2 size={11}/> Projet soumis avec succès</>}
                {status === "ERROR" && <><AlertCircle size={11}/> Échec de la soumission</>}
              </button>
            </form>
          </div>
        </motion.div>

        {/* BOTTOM FOOTER */}
        <motion.footer 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-28 pt-8 border-t border-white/[0.03] flex justify-between items-center w-full"
        >
          <Link href="/" className="group flex items-center gap-2 text-xs text-slate-500 hover:text-slate-200 transition-colors">
            <ArrowRight size={14} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-medium uppercase tracking-wider">Retour</span>
          </Link>
          <span className="text-[10px] font-medium text-slate-600 uppercase tracking-wider">
            © {new Date().getFullYear()}
          </span>
        </motion.footer>

      </main>
    </div>
  );
}