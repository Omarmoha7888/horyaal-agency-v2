import React, { useState } from 'react';
import { PORTFOLIO_ITEMS } from '../data/portfolioData';
import { PortfolioItem } from '../types';
import { Sparkles, ExternalLink, CheckCircle2, X } from 'lucide-react';

interface PortfolioSectionProps {
  onOpenServiceRequest: (serviceName?: string) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  onOpenServiceRequest,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<PortfolioItem | null>(null);

  const categories = ['All', 'Marketing', 'Branding', 'Social Media', 'Websites', 'Content', 'Analytics'];

  const filteredItems =
    selectedCategory === 'All'
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <section id="portfolio-section" className="py-20 bg-[#07090E] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
              PORTFOLIO &amp; SAMPLE WORK
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-display">
            Mashruucyadeenna <span className="text-gold-gradient">(Sample Work)</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Tusaalooyinka shaqooyinka iyo hab-dhaqanka xirfadeed ee Horyaal Digital Agency u qabato ganacsiyada
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                  isSelected
                    ? 'bg-gold-gradient text-black font-bold shadow-[0_0_15px_rgba(212,175,55,0.4)] scale-105'
                    : 'bg-slate-900/80 text-slate-300 border border-slate-800 hover:border-[#D4AF37]/40 hover:text-white'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              id={`portfolio-item-${item.id}`}
              className="card-luxury rounded-2xl overflow-hidden flex flex-col justify-between group cursor-pointer"
              onClick={() => setActiveProject(item)}
            >
              <div>
                {/* Project Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-85"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090C16] via-transparent to-transparent" />
                  
                  {/* Category & Demo Label Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-[#090A0F]/90 border border-[#D4AF37]/60 text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider shadow-md">
                      {item.typeLabel}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-900/90 text-slate-300 text-[10px] border border-slate-700">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <h3 className="text-lg font-bold text-white group-hover:text-[#D4AF37] transition-colors font-display">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {item.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-[10px] text-amber-200/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Action */}
              <div className="px-6 pb-5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-[#D4AF37] font-semibold flex items-center gap-1 group-hover:underline">
                  Faahfaahin &amp; Qodobbada
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#D4AF37]" />
              </div>
            </div>
          ))}
        </div>

        {/* Project Detail Modal */}
        {activeProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={(e) => {
              if (e.target === e.currentTarget) setActiveProject(null);
            }}
          >
            <div className="relative w-full max-w-2xl bg-[#090C16] border-2 border-[#D4AF37]/50 rounded-2xl p-6 sm:p-8 shadow-2xl text-slate-100 space-y-5 animate-in fade-in zoom-in-95">
              <button
                onClick={() => setActiveProject(null)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-[#D4AF37]/20 border border-[#D4AF37]/60 text-xs font-bold text-[#D4AF37] uppercase">
                  {activeProject.typeLabel}
                </span>
                <span className="text-xs text-slate-400">• {activeProject.category}</span>
              </div>

              <h3 className="text-2xl font-bold text-white font-display">
                {activeProject.title}
              </h3>

              <div className="aspect-[16/9] rounded-xl overflow-hidden border border-slate-800">
                <img
                  src={activeProject.image}
                  alt={activeProject.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                {activeProject.description}
              </p>

              <div>
                <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-2">
                  Waxyaabaha Shaqadan Loo Qabtay (Deliverables):
                </h4>
                <div className="space-y-1.5">
                  {activeProject.deliverables.map((del, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2 text-xs text-slate-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-3">
                <button
                  onClick={() => setActiveProject(null)}
                  className="px-4 py-2 rounded-lg border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white"
                >
                  Xir
                </button>
                <button
                  onClick={() => {
                    const matchedService =
                      activeProject.category === 'Marketing'
                        ? 'Digital Marketing'
                        : activeProject.category === 'Social Media'
                        ? 'Social Media Advertising'
                        : activeProject.category === 'Analytics'
                        ? 'Marketing Analytics'
                        : activeProject.category === 'Branding'
                        ? 'Branding & Content Creation'
                        : 'Website & Online Promotion';
                    setActiveProject(null);
                    onOpenServiceRequest(matchedService);
                  }}
                  className="px-5 py-2 rounded-lg bg-gold-gradient text-black text-xs font-extrabold uppercase tracking-wider shadow-md hover:brightness-110"
                >
                  Dalbo Shaqo Noocaan Ah
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
