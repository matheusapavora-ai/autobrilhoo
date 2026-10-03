import { siteConfig, services, type ServiceId } from '@/config/site';

export type WhatsAppSource =
  | 'hero'
  | 'nav'
  | 'objective'
  | 'retailer'
  | 'service'
  | 'recommendation'
  | 'privacy'
  | 'benefits'
  | 'offer'
  | 'floating'
  | 'final';

export type WhatsAppDetails = {
  source: WhatsAppSource;
  service?: string;
};

export const generateWhatsAppLink = (message: string) =>
  `https://wa.me/${siteConfig.whatsappPhone}?text=${encodeURIComponent(message)}`;

export const getServiceMessage = (serviceId: ServiceId) =>
  services.find((service) => service.id === serviceId)?.message ?? '';

export const trackWhatsAppClick = ({ source, service }: WhatsAppDetails) => {
  const device = window.matchMedia('(max-width: 767px)').matches ? 'mobile' : 'desktop';
  const subjectSlug = service
    ?.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_|_$/g, '');
  const payload = {
    event: `whatsapp_${subjectSlug || source}`,
    cta_source: source,
    service: service || 'não informado',
    device,
  };
  window.dispatchEvent(new CustomEvent('autobrilho:whatsapp_click', { detail: payload }));
  const dataLayer = (window as Window & { dataLayer?: Array<Record<string, string>> }).dataLayer;
  if (Array.isArray(dataLayer)) dataLayer.push(payload);
};

export const openWhatsApp = (message: string, details: WhatsAppDetails) => {
  trackWhatsAppClick(details);
  window.open(generateWhatsAppLink(message), '_blank', 'noopener,noreferrer');
};