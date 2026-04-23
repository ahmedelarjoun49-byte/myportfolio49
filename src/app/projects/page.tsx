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
    <div className="min-h-screen bg-[#030303] text-white selection:bg-blue-600/30 overflow-x-hidden relative">
      
      {/* --- NEW BLUE GRADIENT SYSTEM --- */}
      <div className="fixed inset-0 z-0">
        {/* Grain Overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />
        
        {/* Primary Royal Blue Glow */}
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-blue-600/10 blur-[120px] animate-pulse" />
        
        {/* Secondary Deep Blue Glow */}
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-800/10 blur-[100px]" />
      </div>

      <main className="relative z-10 max-w-6xl mx-auto px-6 py-24 md:py-32">
        
        {/* REFINED HEADER: Clean & Professional */}
        <header className="mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h2 className="text-blue-500 font-bold uppercase tracking-[0.3em] text-[10px]">
              Available for projects
            </h2>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
              Let&apos;s build <br />
              <span className="text-zinc-500">something great.</span>
            </h1>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* LEFT: Quick Contact Info */}
          <div className="lg:col-span-4 space-y-6">
            <div 
              onClick={copyToClipboard}
              className="p-8 rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-xl cursor-pointer group hover:border-blue-500/30 transition-all duration-500"
            >
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 mb-4 italic">Direct Mail</p>
              <h3 className="text-lg font-bold group-hover:text-blue-400 transition-colors">
                {email}
              </h3>
              <div className="mt-6">
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.span key="c" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-blue-400 text-[10px] font-bold flex items-center gap-2">
                      <Check size={12}/> COPIED
                    </motion.span>
                  ) : (
                    <span className="text-zinc-500 text-[10px] font-bold flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Copy size={12}/> CLICK TO COPY
                    </span>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-zinc-900/10 border border-white/5 backdrop-blur-sm">
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 mb-2 italic">Based in</p>
              <p className="text-zinc-300 font-medium">Rabat, Morocco</p>
            </div>
          </div>

          {/* RIGHT: Optimized Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-8"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-500">Name</label>
                  <input name="name" type="text" required className="w-full bg-zinc-900/50 border border-white/5 rounded-2xl px-5 py-4 outline-none focus:border-blue-600 focus:bg-zinc-900/80 transition-all text-sm" placeholder="John Doe" />
                </div>
                <div className="space-y-3">
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-500">Email</label>
                  <input name="email" type="email" required className="w-full bg-zinc-900/50 border border-white/5 rounded-2xl px-5 py-4 outline-none focus:border-blue-600 focus:bg-zinc-900/80 transition-all text-sm" placeholder="john@example.com" />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-500">Project Type</label>
                <input name="subject" type="text" required className="w-full bg-zinc-900/50 border border-white/5 rounded-2xl px-5 py-4 outline-none focus:border-blue-600 focus:bg-zinc-900/80 transition-all text-sm" placeholder="Web Development, 3D Design, etc." />
              </div>

              <div className="space-y-3">
                <label className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-500">Message</label>
                <textarea name="message" rows={5} required className="w-full bg-zinc-900/50 border border-white/5 rounded-3xl px-5 py-4 outline-none focus:border-blue-600 focus:bg-zinc-900/80 transition-all resize-none text-sm" placeholder="Briefly describe your vision..." />
              </div>

              <button 
                type="submit" 
                disabled={status !== "IDLE"}
                className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] transition-all duration-500 flex items-center justify-center gap-3 ${
                  status === "SUCCESS" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : 
                  status === "ERROR" ? "bg-red-500/20 text-red-400 border border-red-500/30" : 
                  "bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.2)]"
                }`}
              >
                {status === "IDLE" && <><Send size={14}/> Send Inquiry</>}
                {status === "SENDING" && <><Loader2 size={14} className="animate-spin"/> Processing</>}
                {status === "SUCCESS" && <><CheckCircle2 size={14}/> Sent Successfully</>}
                {status === "ERROR" && <><AlertCircle size={14}/> Action Failed</>}
              </button>
            </form>
          </motion.div>
        </div>

        {/* Footer Navigation */}
        <footer className="mt-32 pt-8 border-t border-white/5 flex justify-between items-center">
          <Link href="/" className="group flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-600 transition-all">
              <ArrowRight size={14} className="rotate-180" />
            </div>
            <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-white transition-colors">Home</span>
          </Link>
          <span className="text-[8px] font-bold text-zinc-800 uppercase tracking-[0.4em]">Ahmed El Arjoun // 2026</span>
        </footer>
      </main>
    </div>
  );
}