import React from 'react';
import { ArrowRight, Sparkles, TrendingUp, ShieldCheck, Zap, Globe } from 'lucide-react';
import { CircularLogo } from './CircularLogo';

interface BusinessGrowthSectionProps {
  onContactClick: () => void;
  onOpenServiceRequest: () => void;
}

export const BusinessGrowthSection: React.FC<BusinessGrowthSectionProps> = ({
  onContactClick,
  onOpenServiceRequest,
}) => {
  const growthPillars = [
    {
      title: 'Digital Marketing',
      desc: 'Waxay kuu fureysaa dariiqooyin cusub oo macaamiil aad ku gaarto.',
    },
    {
      title: 'Social Media',
      desc: 'Waxay dhisaysaa bulsho iyo wada-hadal toos ah oo ku xiran ganacsigaaga.',
    },
    {
      title: 'Branding',
      desc: 'Waxay kor u qaadaysaa kalsoonida iyo sharafta shirkadeed.',
    },
    {
      title: 'Analytics',
      desc: 'Waxay hubisaa in go\'aannada suuq-geyntu ku dhisnaadaan xog dhab ah.',
    },
    {
      title: 'Websites',
      desc: 'Waa xafiiskaaga 24/7 furan oo macaamiishu kaaga dalban karaan adeeg kasta.',
    },
    {
      title: 'Online Promotion',
      desc: 'Waxay balaadhinaysaa fursadaha iibka iyo gaarista suuqyo cusub.',
    },
  ];

  return (
    <section id="business-growth-section" className="py-20 bg-gradient-to-b from-[#090C16] via-[#05070B] to-[#080B14] border-t border-[#D4AF37]/20 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Growth Banner Container */}
        <div className="card-luxury p-8 sm:p-12 rounded-3xl border-2 border-[#D4AF37]/40 shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(212,175,55,0.15)] relative">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Info & Heading */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
                  STRATEGIC ADVANTAGE
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-display leading-tight">
                GANACSIGAAGA HA JOOGSAN — <span className="text-gold-gradient">HA KORO 🚀</span>
              </h2>

              <p className="text-base text-slate-300 leading-relaxed font-normal">
                Suuqa maanta wuxuu u baahan yahay xirfad iyo joogto. Isku-dhafka xeeladaysan ee Digital Marketing, Social Media, Branding, Analytics, Websites iyo Online Promotion waxay ganacsigaaga ka caawinayaan inuu yeesho awood tartan oo dhab ah, korna u qaado joogitaankaaga internetka iyo fursadaha kobaca.
              </p>

              <div className="pt-2 flex flex-wrap gap-4 items-center">
                <button
                  id="growth-contact-btn"
                  onClick={onContactClick}
                  className="bg-gold-gradient text-black font-extrabold text-sm uppercase tracking-wider px-7 py-3.5 rounded-full shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
                >
                  <span>NALA SOO XIRIIR</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  id="growth-order-btn"
                  onClick={onOpenServiceRequest}
                  className="px-6 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 border border-[#D4AF37]/40 text-slate-200 hover:text-white text-xs font-bold uppercase tracking-wider transition-all"
                >
                  Dalbo Adeeg
                </button>
              </div>
            </div>

            {/* Right Pillars Bento */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {growthPillars.map((pillar, pIdx) => (
                <div
                  key={pIdx}
                  className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/90 hover:border-[#D4AF37]/40 transition-all space-y-1.5"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                    <h3 className="text-sm font-bold text-white">{pillar.title}</h3>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed pl-4">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
