import React from 'react';
import { Target, Compass, Award, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { CircularLogo } from './CircularLogo';

interface AboutSectionProps {
  onLearnMoreClick?: () => void;
  onOpenServiceRequest: (serviceName?: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onLearnMoreClick,
  onOpenServiceRequest,
}) => {
  const pillars = [
    'Digital presence',
    'Marketing',
    'Branding',
    'Content',
    'Analytics',
    'Websites',
    'Online promotion',
  ];

  const coreValues = [
    'Professionalism',
    'Creativity',
    'Integrity',
    'Data-driven thinking',
    'Customer focus',
    'Business growth',
  ];

  return (
    <section id="about-us-section" className="py-20 bg-[#07090E] relative overflow-hidden">
      {/* Decorative background light */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
              WHO WE ARE
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-display">
            KU SAABSAN <span className="text-gold-gradient">HORYAAL DIGITAL AGENCY</span>
          </h2>
          <p className="text-base text-slate-300 leading-relaxed">
            Horyaal Digital Agency (HD) waa shirkad casri ah oo u taagan inay ganacsiyada Soomaaliyeed iyo kuwa caalamiga ahba ka caawiso inay si xirfadeysan uga dhex muuqdaan suuqa casriga ah ee internetka.
          </p>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* LEFT: Core Pillars & Explanation */}
          <div className="lg:col-span-6 space-y-6">
            <div className="card-luxury p-8 rounded-2xl border-[#D4AF37]/25 space-y-5">
              <h3 className="text-xl font-extrabold text-white font-display flex items-center gap-3">
                <CircularLogo size="sm" />
                <span>Maxaan Ka Caawinnaa Ganacsiyada?</span>
              </h3>
              
              <p className="text-sm text-slate-300 leading-relaxed">
                Horyaal Digital Agency waxay ganacsiyada ka caawisaa inay si joogto ah u horumariyaan tiirarka ugu muhiimsan ee guusha digital-ka:
              </p>

              {/* 7 Core Focus Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {pillars.map((pillar) => (
                  <div
                    key={pillar}
                    className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-sm text-slate-200 hover:border-[#D4AF37]/40 transition-colors"
                  >
                    <div className="w-5 h-5 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] flex-shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-medium capitalize">{pillar}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 flex flex-wrap gap-4 items-center">
                {onLearnMoreClick && (
                  <button
                    onClick={onLearnMoreClick}
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#D4AF37] hover:text-white transition-colors"
                  >
                    <span>Wax Badan Akhri</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}

                <button
                  onClick={() => onOpenServiceRequest()}
                  className="bg-gold-gradient text-black font-extrabold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full shadow-md hover:brightness-110 transition-all"
                >
                  Dalbo Adeeg Hadda
                </button>
              </div>
            </div>

            {/* Team photo card */}
            <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-xl relative aspect-[16/8]">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop"
                alt="Horyaal Digital Agency team collaborating"
                className="w-full h-full object-cover brightness-75 hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090C16] via-transparent to-transparent flex items-end p-5">
                <p className="text-xs font-semibold text-amber-200/90 tracking-wide">
                  Koox xirfadlayaal ah oo u heellan kobcinta iyo tayada ganacsigaaga.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: Mission, Vision, Core Values Cards */}
          <div className="lg:col-span-6 space-y-5">
            
            {/* Mission Card */}
            <div className="card-luxury p-6 sm:p-7 rounded-2xl border-l-4 border-l-[#D4AF37] hover:border-[#D4AF37]/50 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] flex-shrink-0">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-1.5 font-display flex items-center gap-2">
                    <span>Our Mission</span>
                    <span className="text-xs font-mono text-[#D4AF37]">(Hadafkeenna)</span>
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Inaan ganacsiyada ka caawino inay si xirfad leh uga faa'iideystaan digital-ka, suuq-geynta iyo branding-ka.
                  </p>
                </div>
              </div>
            </div>

            {/* Vision Card */}
            <div className="card-luxury p-6 sm:p-7 rounded-2xl border-l-4 border-l-amber-500 hover:border-[#D4AF37]/50 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-amber-400 flex-shrink-0">
                  <Compass className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-1.5 font-display flex items-center gap-2">
                    <span>Our Vision</span>
                    <span className="text-xs font-mono text-amber-400">(Aragteena)</span>
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Inaan noqono hay'ad digital ah oo lagu kalsoon yahay oo ka shaqeysa kobcinta ganacsiyada Soomaaliyeed.
                  </p>
                </div>
              </div>
            </div>

            {/* Core Values Card */}
            <div className="card-luxury p-6 sm:p-7 rounded-2xl border-l-4 border-l-[#D4AF37] hover:border-[#D4AF37]/50 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] flex-shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div className="w-full">
                  <h4 className="text-lg font-bold text-white mb-1.5 font-display flex items-center gap-2">
                    <span>Core Values</span>
                    <span className="text-xs font-mono text-[#D4AF37]">(Qiyamka Aasaasiga Ah)</span>
                  </h4>
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    {coreValues.map((val) => (
                      <div
                        key={val}
                        className="text-xs font-medium text-slate-200 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800 flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                        <span>{val}</span>
                      </div>
                    ))}
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
