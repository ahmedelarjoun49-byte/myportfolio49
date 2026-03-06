"use client";

import React, { useState } from "react";
import { Send, Loader2, CheckCircle2, AlertCircle, User, Mail, Bug, MessageSquare } from "lucide-react";

export default function ContactPage() {
  const [status, setStatus] = useState<"IDLE" | "SENDING" | "SUCCESS" | "ERROR">("IDLE");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("SENDING");
    const formData = new FormData(e.currentTarget);
    formData.append("access_key", "eda1f62f-b094-47ab-a68d-46fb67a6c698");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
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
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-12 flex items-center justify-center selection:bg-blue-500/30">
      <div className="w-full max-w-xl">
        <div className="mb-10 text-center">
          <h1 className="text-5xl font-extrabold tracking-tighter mb-2 italic">BUG REPORT</h1>
          <p className="text-zinc-500 text-sm uppercase tracking-[0.2em]">Help me improve the system</p>
        </div>
        
        {/* Main Card */}
        <div className="relative bg-zinc-900/40 border border-white/5 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <input type="checkbox" name="botcheck" className="hidden" />

            <div className="grid grid-cols-1 gap-6">
              {[
                { id: "name", label: "Full Name", icon: <User size={14}/>, type: "text" },
                { id: "email", label: "Email Address", icon: <Mail size={14}/>, type: "email" },
                { id: "subject", label: "Bug Subject", icon: <Bug size={14}/>, type: "text" }
              ].map((field) => (
                <div key={field.id} className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                    {field.icon} {field.label}
                  </label>
                  <input 
                    name={field.id} 
                    type={field.type} 
                    required 
                    className="w-full bg-zinc-950/50 border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all duration-300 placeholder:text-zinc-700" 
                    placeholder={`Enter your ${field.label.toLowerCase()}...`}
                  />
                </div>
              ))}

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                  <MessageSquare size={14}/> Description
                </label>
                <textarea 
                  name="description" 
                  rows={4} 
                  required 
                  className="w-full bg-zinc-950/50 border border-white/5 rounded-xl px-5 py-4 outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all duration-300 resize-none placeholder:text-zinc-700" 
                  placeholder="Explain what happened..." 
                />
              </div>
            </div>

            {/* The Submit Button - Placed directly inside form */}
            <button 
              type="submit" 
              disabled={status !== "IDLE"}
              className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3 ${
                status === "SUCCESS" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : 
                status === "ERROR" ? "bg-red-500/20 text-red-400 border border-red-500/30" : 
                "bg-white text-black hover:bg-zinc-200"
              }`}
            >
              {status === "IDLE" && <><Send size={16}/> Submit Report</>}
              {status === "SENDING" && <><Loader2 size={16} className="animate-spin"/> Transmitting...</>}
              {status === "SUCCESS" && <><CheckCircle2 size={16}/> Report Received</>}
              {status === "ERROR" && <><AlertCircle size={16}/> Transmission Failed</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}