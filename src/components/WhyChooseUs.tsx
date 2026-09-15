import React from 'react';
import { Award, Lightbulb, BarChart4, Briefcase, HeartHandshake, TrendingUp, Sparkles } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const reasons = [
    {
      id: 'why-1',
      title: 'Xirfad iyo Professionalism',
      desc: 'Shaqo tayo leh oo si nidaamsan loo qabto.',
      icon: Award,
    },
    {
      id: 'why-2',
      title: 'Hal-abuur',
      desc: 'Waxaan abuurnaa xalal iyo content ganacsigaaga ku habboon.',
      icon: Lightbulb,
    },
    {
      id: 'why-3',
      title: 'Data-Driven Thinking',
      desc: 'Waxaan isticmaalnaa xogta si aan u fahamno marketing-ka.',
      icon: BarChart4,
    },
    {
      id: 'why-4',
      title: 'Fahamka Ganacsiga',
      desc: 'Waxaan diiradda saarnaa baahida dhabta ah ee ganacsigaaga.',
      icon: Briefcase,
    },
    {
      id: 'why-5',
      title: 'Xiriir iyo Adeeg Wanaagsan',
      desc: 'Waxaan dhisnaa xiriir wanaagsan oo shaqo.',
      icon: HeartHandshake,
    },
    {
      id: 'why-6',
      title: 'Diiradda Kobaca Ganacsiga',
      desc: 'Hadafku waa in ganacsigaaga loo abuuro fursado kobac.',
      icon: TrendingUp,
    },
  ];

  return (
    <section id="why-choose-us-section" className="py-20 bg-[#07090E] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
              WHY CHOOSE US
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-display">
            MAXAA HD <span className="text-gold-gradient">LOOGU DOORTAA?</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Sababaha ay ganacsiyada horumarka doonaya u doortaan inay la shaqeeyaan Horyaal Digital Agency
          </p>
        </div>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                id={item.id}
                className="card-luxury p-7 rounded-2xl border-[#D4AF37]/20 hover:border-[#D4AF37]/60 group transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] mb-4 group-hover:bg-[#D4AF37]/25 group-hover:scale-105 transition-all shadow-[0_0_15px_rgba(212,175,55,0.15)]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#D4AF37] transition-colors mb-2 font-display">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span className="text-[#D4AF37] font-mono font-medium">Horyaal Quality</span>
                  <span className="text-[11px] text-slate-500">100% Commitment</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
