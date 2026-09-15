import React, { useState } from 'react';
import { BLOG_POSTS } from '../data/blogData';
import { BlogPost } from '../types';
import { Sparkles, Clock, Calendar, ArrowRight, X, BookOpen, CheckCircle2 } from 'lucide-react';

export const BlogSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);

  const categories = [
    'All',
    'Digital Marketing',
    'Social Media',
    'Branding',
    'Business Growth',
    'Websites',
    'Marketing Analytics',
  ];

  const filteredPosts =
    selectedCategory === 'All'
      ? BLOG_POSTS
      : BLOG_POSTS.filter((post) => post.category === selectedCategory);

  return (
    <section id="blog-section" className="py-20 bg-[#07090E] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
              BLOG &amp; INSIGHTS
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-display">
            Maqaallada &amp; <span className="text-gold-gradient">Aqoonta Suuq-geynta</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Fikrado wax ku ool ah oo ku saabsan sida loo kobciyo ganacsiyada xilliga digital-ka
          </p>
        </div>

        {/* Category Filters */}
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

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              id={`blog-post-${post.id}`}
              className="card-luxury rounded-2xl p-7 flex flex-col justify-between group cursor-pointer hover:border-[#D4AF37]/60"
              onClick={() => setActiveArticle(post)}
            >
              <div className="space-y-4">
                {/* Meta info */}
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-1 rounded-md bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] font-semibold">
                    {post.category}
                  </span>
                  <span className="text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-500" />
                    <span>{post.readTime}</span>
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-gold-gradient transition-colors font-display line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed line-clamp-3">
                  {post.summary}
                </p>
              </div>

              {/* Bottom Footer */}
              <div className="pt-5 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  <span>{post.date}</span>
                </span>

                <span className="text-[#D4AF37] font-bold flex items-center gap-1 group-hover:underline">
                  <span>Akhri Maqaalka</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Article Reader Modal */}
        {activeArticle && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
            onClick={(e) => {
              if (e.target === e.currentTarget) setActiveArticle(null);
            }}
          >
            <div className="relative w-full max-w-2xl bg-[#090C16] border-2 border-[#D4AF37]/50 rounded-2xl p-6 sm:p-8 shadow-2xl text-slate-100 space-y-6 my-8 animate-in fade-in zoom-in-95">
              <button
                onClick={() => setActiveArticle(null)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs">
                  <span className="px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#D4AF37] font-bold">
                    {activeArticle.category}
                  </span>
                  <span className="text-slate-400">{activeArticle.date}</span>
                  <span className="text-slate-400">• {activeArticle.readTime}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
                  {activeArticle.title}
                </h3>
              </div>

              {/* Body paragraphs */}
              <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed border-t border-slate-800 pt-4">
                {activeArticle.content.map((paragraph, pIdx) => (
                  <p key={pIdx}>{paragraph}</p>
                ))}
              </div>

              {/* Key takeaways */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-[#D4AF37]/30 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span>Qodobada Muhiimka Ah (Key Takeaways):</span>
                </h4>
                <div className="space-y-1.5">
                  {activeArticle.keyTakeaways.map((takeaway, tIdx) => (
                    <div key={tIdx} className="flex items-center gap-2 text-xs text-slate-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
                      <span>{takeaway}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex justify-end">
                <button
                  onClick={() => setActiveArticle(null)}
                  className="px-6 py-2 rounded-lg bg-gold-gradient text-black text-xs font-bold uppercase tracking-wider shadow-md hover:brightness-110"
                >
                  Xir Maqaalka
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
