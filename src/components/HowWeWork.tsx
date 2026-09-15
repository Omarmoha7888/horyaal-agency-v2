import React from 'react';
import { Sparkles, ArrowRight, Search, Compass, Palette, Sliders, TrendingUp } from 'lucide-react';

export const HowWeWork: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Fahamka Ganacsigaaga',
      desc: 'Waxaan marka hore fahmeynaa ganacsigaaga iyo hadafyadaada.',
      icon: Search,
    },
    {
      step: '02',
      title: 'Strategy',
      desc: 'Waxaan diyaarineynaa qorshaha ku habboon.',
      icon: Compass,
    },
    {
      step: '03',
      title: 'Creation',
      desc: 'Waxaan abuureynaa content, campaigns, branding ama website.',
      icon: Palette,
    },
    {
      step: '04',
      title: 'Optimization',
      desc: 'Waxaan eegnaa waxqabadka oo hagaajinnaa meelaha loo baahan yahay.',
      icon: Sliders,
    },
    {
      step: '05',
      title: 'Growth',
      desc: 'Ujeeddadu waa in ganacsigaaga loo abuuro fursado kobac iyo horumar.',
      icon: TrendingUp,
    },
  ];

  return (
    <section id="how-we-work-section" className="py-20 bg-[#06080F] border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
              HABKA AAN U SHAQAYNO
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-display">
            Sidee Aan <span className="text-gold-gradient">U Shaqeynaa?</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Tallaabooyin fudud oo nidaamsan si aan u gaarno natiijooyin wanaagsan oo waara
          </p>
        </div>

        {/* 5-Step Progress Flow Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 relative">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                id={`step-${item.step}`}
                className="card-luxury p-6 rounded-2xl flex flex-col justify-between relative group hover:border-[#D4AF37]/60 transition-all duration-300"
              >
                <div>
                  {/* Step Number Top Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-full bg-gold-gradient text-black font-extrabold text-sm flex items-center justify-center font-mono shadow-[0_0_12px_rgba(212,175,55,0.4)]">
                      {item.step}
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 text-[#D4AF37] flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2 font-display group-hover:text-[#D4AF37] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Tallaabada {item.step}</span>
                  {index < steps.length - 1 && (
                    <ArrowRight className="w-3 h-3 text-[#D4AF37] hidden lg:block" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
