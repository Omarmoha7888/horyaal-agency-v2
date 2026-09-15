import React, { useState, useEffect } from 'react';
import { PageView, ServiceDetail } from './types';
import { SERVICES_LIST } from './data/servicesData';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { QuickBenefits } from './components/QuickBenefits';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { ServiceDetailView } from './components/ServiceDetailView';
import { WhyChooseUs } from './components/WhyChooseUs';
import { HowWeWork } from './components/HowWeWork';
import { PortfolioSection } from './components/PortfolioSection';
import { BusinessGrowthSection } from './components/BusinessGrowthSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FAQSection } from './components/FAQSection';
import { BlogSection } from './components/BlogSection';
import { ContactSection } from './components/ContactSection';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { ServiceRequestModal } from './components/ServiceRequestModal';
import { Phone, MessageCircle, ArrowUp } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalPreselectedService, setModalPreselectedService] = useState<string>('Digital Marketing');
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);

  // Monitor scroll for back to top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (page: PageView) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectService = (service: ServiceDetail) => {
    setSelectedService(service);
    setCurrentPage('service-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenServiceRequest = (serviceName?: string) => {
    if (serviceName) {
      setModalPreselectedService(serviceName);
    } else if (selectedService) {
      setModalPreselectedService(selectedService.exactName);
    } else {
      setModalPreselectedService('Digital Marketing');
    }
    setIsModalOpen(true);
  };

  const handleBackToServices = () => {
    setCurrentPage('services');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col font-sans selection:bg-[#D4AF37] selection:text-black">
      
      {/* Top Header */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenServiceModal={() => handleOpenServiceRequest()}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {/* VIEW 1: HOME PAGE */}
        {currentPage === 'home' && (
          <div className="animate-in fade-in duration-300">
            <Hero
              onExploreServices={() => handleNavigate('services')}
              onContactClick={() => handleNavigate('contact')}
              onOpenServiceRequest={handleOpenServiceRequest}
            />

            <QuickBenefits />

            <AboutSection
              onLearnMoreClick={() => handleNavigate('about')}
              onOpenServiceRequest={handleOpenServiceRequest}
            />

            <ServicesSection
              onSelectService={handleSelectService}
              onOpenServiceRequest={handleOpenServiceRequest}
            />

            <WhyChooseUs />

            <HowWeWork />

            <BusinessGrowthSection
              onContactClick={() => handleNavigate('contact')}
              onOpenServiceRequest={() => handleOpenServiceRequest()}
            />

            <PortfolioSection
              onOpenServiceRequest={handleOpenServiceRequest}
            />

            <TestimonialsSection
              onOpenServiceRequest={() => handleOpenServiceRequest()}
            />

            <FAQSection />

            <BlogSection />

            <FinalCTA
              onContactClick={() => handleNavigate('contact')}
              onExploreServices={() => handleNavigate('services')}
            />
          </div>
        )}

        {/* VIEW 2: ABOUT US PAGE */}
        {currentPage === 'about' && (
          <div className="animate-in fade-in duration-300">
            <AboutSection
              onOpenServiceRequest={handleOpenServiceRequest}
            />
            <WhyChooseUs />
            <HowWeWork />
            <FinalCTA
              onContactClick={() => handleNavigate('contact')}
              onExploreServices={() => handleNavigate('services')}
            />
          </div>
        )}

        {/* VIEW 3: SERVICES DIRECTORY PAGE */}
        {currentPage === 'services' && (
          <div className="animate-in fade-in duration-300">
            <ServicesSection
              onSelectService={handleSelectService}
              onOpenServiceRequest={handleOpenServiceRequest}
            />
            <BusinessGrowthSection
              onContactClick={() => handleNavigate('contact')}
              onOpenServiceRequest={() => handleOpenServiceRequest()}
            />
            <FinalCTA
              onContactClick={() => handleNavigate('contact')}
              onExploreServices={() => handleNavigate('services')}
            />
          </div>
        )}

        {/* VIEW 4: SERVICE DETAIL PAGE */}
        {currentPage === 'service-detail' && selectedService && (
          <div className="animate-in fade-in duration-300">
            <ServiceDetailView
              service={selectedService}
              onBack={handleBackToServices}
              onOpenServiceRequest={handleOpenServiceRequest}
            />
          </div>
        )}

        {/* VIEW 5: PORTFOLIO PAGE */}
        {currentPage === 'portfolio' && (
          <div className="animate-in fade-in duration-300">
            <PortfolioSection
              onOpenServiceRequest={handleOpenServiceRequest}
            />
            <FinalCTA
              onContactClick={() => handleNavigate('contact')}
              onExploreServices={() => handleNavigate('services')}
            />
          </div>
        )}

        {/* VIEW 6: WHY CHOOSE US PAGE */}
        {currentPage === 'why-choose-us' && (
          <div className="animate-in fade-in duration-300">
            <WhyChooseUs />
            <HowWeWork />
            <FinalCTA
              onContactClick={() => handleNavigate('contact')}
              onExploreServices={() => handleNavigate('services')}
            />
          </div>
        )}

        {/* VIEW 7: HOW WE WORK PAGE */}
        {currentPage === 'how-we-work' && (
          <div className="animate-in fade-in duration-300">
            <HowWeWork />
            <BusinessGrowthSection
              onContactClick={() => handleNavigate('contact')}
              onOpenServiceRequest={() => handleOpenServiceRequest()}
            />
            <FinalCTA
              onContactClick={() => handleNavigate('contact')}
              onExploreServices={() => handleNavigate('services')}
            />
          </div>
        )}

        {/* VIEW 8: BLOG PAGE */}
        {currentPage === 'blog' && (
          <div className="animate-in fade-in duration-300">
            <BlogSection />
            <FinalCTA
              onContactClick={() => handleNavigate('contact')}
              onExploreServices={() => handleNavigate('services')}
            />
          </div>
        )}

        {/* VIEW 9: FAQ PAGE */}
        {currentPage === 'faq' && (
          <div className="animate-in fade-in duration-300">
            <FAQSection />
            <FinalCTA
              onContactClick={() => handleNavigate('contact')}
              onExploreServices={() => handleNavigate('services')}
            />
          </div>
        )}

        {/* VIEW 10: CONTACT PAGE */}
        {currentPage === 'contact' && (
          <div className="animate-in fade-in duration-300">
            <ContactSection
              onOpenServiceRequest={() => handleOpenServiceRequest()}
            />
          </div>
        )}
      </main>

      {/* Floating Fast Action Elements */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        {/* Direct WhatsApp Floating button */}
        <a
          href="https://wa.me/252612141414?text=Asc%20Horyaal%20Digital%20Agency,%20waxaan%20doonayaa%20in%20aan%20idinkala%20hadlo%20adeegyadaada."
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-[#25D366] text-black flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.45)] hover:scale-110 active:scale-95 transition-all duration-300 group"
          title="Nala Hadal WhatsApp: 612141414"
          aria-label="WhatsApp Chat"
        >
          <MessageCircle className="w-6 h-6 text-black" />
        </a>

        {/* Direct Call Floating button */}
        <a
          href="tel:612141414"
          className="w-12 h-12 rounded-full bg-slate-900 border border-[#D4AF37]/60 text-[#D4AF37] flex items-center justify-center shadow-2xl hover:bg-[#D4AF37] hover:text-black transition-all duration-300 group"
          title="Wac HD: 612141414"
          aria-label="Phone Call"
        >
          <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </a>

        {/* Scroll To Top */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="w-12 h-12 rounded-full bg-slate-900/90 border border-slate-700 text-slate-300 flex items-center justify-center shadow-xl hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all"
            title="Xagga Sare U Noqo"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Global Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenServiceRequest={handleOpenServiceRequest}
      />

      {/* Service Request Modal */}
      <ServiceRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialService={modalPreselectedService}
      />

    </div>
  );
}
