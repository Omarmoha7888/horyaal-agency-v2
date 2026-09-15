import React from 'react';
import { Lightbulb, BarChart3, Users2, ShieldCheck, Target } from 'lucide-react';

export const QuickBenefits: React.FC = () => {
  const benefits = [
    {
      id: 'benefit-creative-solutions',
      title: 'Creative Solutions',
      desc: 'Xalal hal-abuur leh oo ganacsigaaga ka caawinaya inuu si wanaagsan u muuqdo.',
      icon: Lightbulb,
    },
    {
      id: 'benefit-data-driven-results',
      title: 'Data-Driven Results',
      desc: "Go'aanno marketing oo ku saleysan xog iyo faham sax ah.",
      icon: BarChart3,
    },
    {
      id: 'benefit-professional-team',
      title: 'Professional Team',
      desc: 'Shaqo xirfad leh oo si nidaamsan loo fuliyo.',
      icon: Users2,
    },
    {
      id: 'benefit-growth-priority',
      title: 'Your Growth Is Our Priority',
      desc: 'Hadafkeennu waa kobaca iyo horumarka ganacsigaaga.',
      icon: Target,
    },
  ];

  return (
    <section id="quick-benefits-section" className="py-12 bg-[#06080E] border-y border-[#D4AF37]/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {benefits.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                id={item.id}
                className="card-luxury p-6 rounded-2xl flex flex-col justify-between group hover:border-[#D4AF37]/60"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] mb-4 group-hover:bg-[#D4AF37]/25 group-hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.15)]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#D4AF37] transition-colors mb-2 font-display">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-[#D4AF37]">
                  <span className="font-semibold tracking-wide">HD Excellence</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
