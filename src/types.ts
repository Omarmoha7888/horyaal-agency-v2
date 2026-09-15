export type PageView =
  | 'home'
  | 'about'
  | 'services'
  | 'service-detail'
  | 'portfolio'
  | 'why-choose-us'
  | 'how-we-work'
  | 'blog'
  | 'faq'
  | 'contact';

export type ServiceId =
  | 'digital-marketing'
  | 'social-media-advertising'
  | 'marketing-analytics'
  | 'branding-content-creation'
  | 'website-online-promotion';

export type ExactServiceName =
  | 'Digital Marketing'
  | 'Social Media Advertising'
  | 'Marketing Analytics'
  | 'Branding & Content Creation'
  | 'Website & Online Promotion';

export interface ServiceDetail {
  id: ServiceId;
  serviceNumber: string;
  exactName: ExactServiceName;
  title: string;
  shortDesc: string;
  longDesc: string;
  heroImage: string;
  features: string[];
  whatWeProvide: string[];
  benefits: string[];
  howItWorks: { step: string; title: string; desc: string }[];
  examples: { title: string; detail: string }[];
  faqs: { question: string; answer: string }[];
}

export interface ServiceRequestPayload {
  fullName: string;
  phone: string;
  email: string;
  companyName: string;
  service: ExactServiceName;
  projectDetails: string;
  preferredContact: 'Phone' | 'WhatsApp' | 'Email';
  honeypot?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'Marketing' | 'Branding' | 'Social Media' | 'Websites' | 'Content' | 'Analytics';
  typeLabel: 'Demo Project' | 'Sample Work';
  description: string;
  tags: string[];
  image: string;
  deliverables: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  category: 'Digital Marketing' | 'Social Media' | 'Branding' | 'Business Growth' | 'Websites' | 'Marketing Analytics';
  readTime: string;
  date: string;
  summary: string;
  content: string[];
  keyTakeaways: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}
