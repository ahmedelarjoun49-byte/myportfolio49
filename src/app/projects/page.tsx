"use client";

import React, { useState } from "react";
import { 
  Send, Loader2, CheckCircle2, AlertCircle, 
  User, Mail, MessageSquare, Tag, Copy, Check, ArrowRight 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

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
    <div className="min-h-screen bg-[#030303] text-white selection:bg-blue-600/30 overflow-x-hidden">
      {/* Visual Depth Assets */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <div className="fixed inset-0 z-0 bg-[radial-gradient(circle_at_80%_20%,rgba(37,99,235,0.08),transparent_50%)]" />

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-32 md:py-44">
        
        {/* HEADER: Fix for invisible name */}
        <section className="mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-[12vw] md:text-[8vw] font-black uppercase leading-[0.8] tracking-tighter">
              Ahmed <br />
              <span className="text-zinc-900 outline-text-fixed">El Arjoun.</span>
            </h1>
          </motion.div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: Quick Contact */}
          <div className="lg:col-span-5 space-y-8">
            <div 
              onClick={copyToClipboard}
              className="p-10 rounded-[2.5rem] bg-zinc-900/20 border border-white/5 backdrop-blur-3xl cursor-pointer group relative overflow-hidden"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-600 block mb-6 italic">Direct Contact</span>
              <h2 className="text-lg md:text-xl font-bold group-hover:text-blue-500 transition-all duration-500">
                {email}
              </h2>
              <div className="mt-8 flex items-center gap-2">
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.span key="c" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-500 text-[10px] font-bold">COPIED TO CLIPBOARD</motion.span>
                  ) : (
                    <span className="text-zinc-500 text-[10px] font-bold flex items-center gap-2"><Copy size={12}/> CLICK TO COPY</span>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* RIGHT: Project Discussion Form */}
          <motion.div 
            className="lg:col-span-7 bg-zinc-900/30 border border-white/5 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-2xl"
          >
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500 flex items-center gap-2 italic"><User size={12}/> Your Name</label>
                  <input name="name" type="text" required className="w-full bg-transparent border-b border-white/10 py-3 outline-none focus:border-blue-500 transition-all text-sm" placeholder="e.g. John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500 flex items-center gap-2 italic"><Mail size={12}/> Your Email</label>
                  <input name="email" type="email" required className="w-full bg-transparent border-b border-white/10 py-3 outline-none focus:border-blue-500 transition-all text-sm" placeholder="john@example.com" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500 flex items-center gap-2 italic"><Tag size={12}/> Project Type</label>
                <input name="subject" type="text" required className="w-full bg-transparent border-b border-white/10 py-3 outline-none focus:border-blue-500 transition-all text-sm" placeholder="e.g. Next.js App, 3D Multimedia" />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500 flex items-center gap-2 italic"><MessageSquare size={12}/> Message Brief</label>
                <textarea name="message" rows={4} required className="w-full bg-transparent border-b border-white/10 py-3 outline-none focus:border-blue-500 transition-all resize-none text-sm" placeholder="Tell me about your project goals..." />
              </div>

              <button 
                type="submit" 
                disabled={status !== "IDLE"}
                className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.4em] text-[11px] transition-all duration-500 flex items-center justify-center gap-4 ${
                  status === "SUCCESS" ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" : 
                  status === "ERROR" ? "bg-red-500/10 text-red-400 border border-red-500/20" : 
                  "bg-white text-black hover:bg-blue-600 hover:text-white"
                }`}
              >
                {status === "IDLE" && <><Send size={14}/> Launch Inquiry</>}
                {status === "SENDING" && <><Loader2 size={14} className="animate-spin"/> Sending...</>}
                {status === "SUCCESS" && <><CheckCircle2 size={14}/> Received Successfully</>}
                {status === "ERROR" && <><AlertCircle size={14}/> Error Occurred</>}
              </button>
            </form>
          </motion.div>
        </div>

        {/* Footer Navigation */}
        <footer className="mt-40 pt-10 border-t border-white/5 flex justify-between items-center">
          <Link href="/" className="group flex items-center gap-4">
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
              <ArrowRight size={16} className="rotate-180" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 group-hover:text-white transition-colors">Return Home</span>
          </Link>
          <span className="text-[9px] font-bold text-zinc-800 uppercase tracking-[0.5em]">Ahmed El Arjoun // 2026</span>
        </footer>
      </main>

      <style jsx global>{`
        .outline-text-fixed {
          -webkit-text-stroke: 1px rgba(255,255,255,0.1);
          color: transparent;
          transition: all 0.4s ease;
        }
        h1:hover .outline-text-fixed {
          -webkit-text-stroke: 1px rgba(37,99,235,0.6);
          color: rgba(37,99,235,0.05);
        }
      `}</style>
    </div>
  );
}