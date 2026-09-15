import React from 'react';
import { ArrowRight, Sparkles, Phone } from 'lucide-react';
import { CircularLogo } from './CircularLogo';

interface FinalCTAProps {
  onContactClick: () => void;
  onExploreServices: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({
  onContactClick,
  onExploreServices,
}) => {
  return (
    <section id="final-cta-section" className="py-20 bg-gradient-to-b from-[#06080F] via-[#090D18] to-[#04060A] relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#D4AF37]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="card-luxury p-10 sm:p-14 rounded-3xl border-2 border-[#D4AF37]/40 shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_35px_rgba(212,175,55,0.2)] space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
              LET'S BUILD TOGETHER
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-display leading-tight">
            GANACSIGAAGA ONLINE-KA <span className="text-gold-gradient">KOR U QAAD 🚀</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Horyaal Digital Agency waxay diyaar u tahay inay kaa caawiso marketing, branding, analytics, content iyo online promotion.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              id="final-cta-contact-btn"
              onClick={onContactClick}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gold-gradient text-black font-extrabold text-sm uppercase tracking-wider shadow-[0_4px_25px_rgba(212,175,55,0.4)] hover:shadow-[0_4px_35px_rgba(212,175,55,0.6)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span>NALA SOO XIRIIR</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </button>

            <button
              id="final-cta-services-btn"
              onClick={onExploreServices}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-slate-900/90 hover:bg-slate-800 text-white font-bold text-sm uppercase tracking-wider border border-[#D4AF37]/50 hover:border-[#D4AF37] transition-all flex items-center justify-center gap-2"
            >
              <span>Eeg Adeegyadeenna</span>
            </button>
          </div>

          <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Toos noo soo wac: <strong className="text-slate-200">612141414</strong></span>
            </div>
            <span>•</span>
            <div>
              <span>Email: <strong className="text-slate-200">horyaalgrowth@gmail.com</strong></span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
