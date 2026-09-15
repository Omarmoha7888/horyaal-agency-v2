import React from 'react';
import { ArrowRight, Phone, TrendingUp, Sparkles, Laptop, Smartphone, BarChart3 } from 'lucide-react';
import { CircularLogo } from './CircularLogo';

interface HeroProps {
  onExploreServices: () => void;
  onContactClick: () => void;
  onOpenServiceRequest: (serviceName?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreServices,
  onContactClick,
  onOpenServiceRequest,
}) => {
  return (
    <section id="hero-section" className="relative min-h-[90vh] flex items-center pt-8 pb-16 overflow-hidden">
      {/* Background Decorative Gold Ambient Orbs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-[#1A365D]/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-1/3 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-2xl pointer-events-none -z-10" />

      {/* Subtle Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10"
        style={{
          backgroundImage: `radial-gradient(#D4AF37 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT: Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/35 shadow-[0_0_15px_rgba(212,175,55,0.15)]">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
                YOUR SUCCESS IS OUR MISSION
              </span>
            </div>

            {/* Giant Title */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black text-white tracking-tight leading-[1.1] font-display">
                HORYAAL <span className="text-gold-gradient">DIGITAL AGENCY</span>
              </h1>
              <div className="text-lg sm:text-xl font-bold tracking-wide text-slate-300 flex items-center gap-3">
                <span className="text-[#D4AF37]">Marketing</span>
                <span className="text-slate-600">•</span>
                <span className="text-white">Analytics</span>
                <span className="text-slate-600">•</span>
                <span className="text-[#D4AF37]">Branding</span>
              </div>
            </div>

            {/* Somali Description */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
              Waxaan ganacsiyada ka caawinnaa inay si wanaagsan uga muuqdaan internetka, macaamiil badan gaaraan, sumcad xooggan dhistaan, isla markaana ganacsigooda kobciyaan.
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-4 sm:items-center">
              <button
                id="hero-services-button"
                onClick={onExploreServices}
                className="bg-gold-gradient text-black font-extrabold text-sm uppercase tracking-wider px-8 py-4 rounded-full shadow-[0_4px_25px_rgba(212,175,55,0.45)] hover:shadow-[0_4px_35px_rgba(212,175,55,0.65)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
              >
                <span>ADEEGYADA AAN BIXINNO</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>

              <button
                id="hero-contact-button"
                onClick={onContactClick}
                className="px-8 py-4 rounded-full bg-[#0A0D17]/80 hover:bg-[#121727] text-white font-bold text-sm uppercase tracking-wider border border-[#D4AF37]/50 hover:border-[#D4AF37] shadow-lg transition-all duration-200 flex items-center justify-center gap-2 hover:text-[#D4AF37]"
              >
                <span>NALA SOO XIRIIR</span>
              </button>
            </div>

            {/* Micro Trust Indicators */}
            <div className="pt-4 flex items-center gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Adeeg Casri ah &amp; Xirfad Sare</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#D4AF37]">★</span>
                <span>Diiradda Kobaca Ganacsiga</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Visual Digital-Business Environment */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-lg">
              {/* Outer Golden Aura */}
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-[#D4AF37]/30 via-transparent to-[#D4AF37]/40 blur-xl opacity-75" />

              {/* Main Visual Frame */}
              <div className="relative rounded-2xl overflow-hidden border border-[#D4AF37]/40 bg-[#090D18] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.95)]">
                
                {/* Hero Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop"
                    alt="Digital marketing workstation showing growth analytics and campaigns"
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700 brightness-90"
                    referrerPolicy="no-referrer"
                  />
                  {/* Luxury Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07090E] via-[#07090E]/30 to-transparent" />
                </div>

                {/* Slogan Floating Luxury Badge - Matching Mockup */}
                <div className="absolute top-4 right-4 z-20">
                  <div className="bg-[#090C16]/90 backdrop-blur-md border border-[#D4AF37]/60 rounded-2xl px-3.5 py-2 shadow-[0_4px_20px_rgba(212,175,55,0.3)]">
                    <p className="text-xs font-black tracking-wide text-white flex items-center gap-1.5">
                      <span className="text-[#D4AF37] font-display">Ganacsigaaga Ayaan</span>
                    </p>
                    <p className="text-xs font-black text-gold-gradient">
                      Kor U Qaadaynaa 🚀
                    </p>
                  </div>
                </div>

                {/* Overlay Interactive Status Bar */}
                <div className="p-5 bg-gradient-to-b from-[#090D18]/80 to-[#04060A] border-t border-slate-800/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <CircularLogo size="sm" />
                      <div>
                        <div className="text-xs font-bold text-white tracking-wide font-display">
                          HORYAAL DIGITAL AGENCY
                        </div>
                        <div className="text-[10px] text-amber-300/80">Digital Growth Partner</div>
                      </div>
                    </div>
                    <button
                      onClick={() => onOpenServiceRequest()}
                      className="text-[11px] font-bold text-black bg-gold-gradient px-3 py-1 rounded-full uppercase tracking-wider hover:brightness-110 transition-all shadow-sm"
                    >
                      Dalbo Hadda
                    </button>
                  </div>

                  {/* 3 Interactive Metric Indicators */}
                  <div className="grid grid-cols-3 gap-2 pt-1 border-t border-slate-800/60 text-center">
                    <div className="p-1.5 rounded-lg bg-slate-900/60 border border-slate-800">
                      <div className="text-[10px] text-slate-400">Marketing</div>
                      <div className="text-xs font-bold text-[#D4AF37]">Strategy</div>
                    </div>
                    <div className="p-1.5 rounded-lg bg-slate-900/60 border border-slate-800">
                      <div className="text-[10px] text-slate-400">Analytics</div>
                      <div className="text-xs font-bold text-white">Xog Dhab ah</div>
                    </div>
                    <div className="p-1.5 rounded-lg bg-slate-900/60 border border-slate-800">
                      <div className="text-[10px] text-slate-400">Branding</div>
                      <div className="text-xs font-bold text-[#D4AF37]">Identity</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
