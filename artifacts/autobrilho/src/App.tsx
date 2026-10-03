import { type ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  ClipboardList,
  ExternalLink,
  MapPin,
  Menu,
  MessageCircle,
  Navigation,
  Phone,
  ShieldCheck,
  Sparkles,
  Store,
  X,
} from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { faqItems, services, siteConfig } from '@/config/site';
import NotFound from '@/pages/not-found';
import {
  generateWhatsAppLink,
  trackWhatsAppClick,
  type WhatsAppSource,
} from '@/utils/whatsapp';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

type WhatsAppLinkProps = {
  message: string;
  source: WhatsAppSource;
  service?: string;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
  testId?: string;
  onClick?: () => void;
};

function WhatsAppLink({ message, source, service, className, children, ariaLabel, testId, onClick }: WhatsAppLinkProps) {
  return (
    <a
      href={generateWhatsAppLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={ariaLabel}
      data-testid={testId}
      onClick={() => {
        trackWhatsAppClick({ source, service });
        onClick?.();
      }}
    >
      {children}
    </a>
  );
}

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#inicio" className="brand-lockup" aria-label="AutoBrilho, voltar ao início" data-testid="link-brand-home">
      <span className={`brand-mark ${compact ? 'brand-mark-compact' : ''}`}>
        <img src="/autobrilho-logo-transparent.png" alt="" />
      </span>
      {!compact && (
        <span className="brand-wordmark">
          AUTO<span>BRILHO</span>
          <small>DIFERENCIAL AUTOMOTIVO</small>
        </span>
      )}
    </a>
  );
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMenuOpen(false);
  };

  return (
    <main className="site-shell">
      <header className="site-nav">
        <div className="nav-inner">
          <BrandMark compact />
          <nav className="desktop-nav" aria-label="Navegação principal">
            <a href="#objetivos" data-testid="link-nav-objectives">Comece aqui</a>
            <a href="#servicos" data-testid="link-nav-services">Serviços</a>
            <a href="#metodo" data-testid="link-nav-method">O cuidado</a>
            <a href="#endereco" data-testid="link-nav-address">Onde estamos</a>
            <WhatsAppLink
              message="Olá! Gostaria de conversar com o Bruno sobre os serviços da AutoBrilho."
              source="nav"
              className="nav-cta"
              ariaLabel="Falar com Bruno pelo WhatsApp"
              testId="link-whatsapp-nav"
            >
              Falar com Bruno <ArrowRight size={15} />
            </WhatsAppLink>
          </nav>
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
            data-testid="button-mobile-menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {menuOpen && (
          <nav className="mobile-nav" aria-label="Navegação mobile">
            <a href="#objetivos" onClick={() => setMenuOpen(false)} data-testid="link-mobile-objectives">Comece aqui</a>
            <a href="#servicos" onClick={() => setMenuOpen(false)} data-testid="link-mobile-services">Serviços</a>
            <a href="#metodo" onClick={() => setMenuOpen(false)} data-testid="link-mobile-method">O cuidado</a>
            <a href="#endereco" onClick={() => setMenuOpen(false)} data-testid="link-mobile-address">Onde estamos</a>
            <WhatsAppLink
              message="Olá! Gostaria de conversar com o Bruno sobre os serviços da AutoBrilho."
              source="nav"
              className="mobile-nav-cta"
              ariaLabel="Falar com Bruno pelo WhatsApp"
              testId="link-whatsapp-mobile-nav"
              onClick={() => setMenuOpen(false)}
            >
              Falar com Bruno <ArrowRight size={16} />
            </WhatsAppLink>
          </nav>
        )}
      </header>

      <section id="inicio" className="hero-section">
        <div className="hero-grid">
          <div className="hero-copy animate-rise">
            <div className="eyebrow eyebrow-light"><span /> AutoBrilho em Ponta Grossa - PR</div>
            <h1>Diferencial<br /><em>automotivo.</em></h1>
            <p className="hero-lede">
              Um cuidado pensado para o estado real do seu veículo — com conversa direta, indicação clara e atenção ao acabamento.
            </p>
            <div className="hero-actions">
              <WhatsAppLink
                message="Olá! Vi o site da AutoBrilho e gostaria de deixar meu carro impecável. Gostaria de saber quais opções vocês recomendam."
                source="hero"
                className="button button-red"
                ariaLabel="Falar com a AutoBrilho pelo WhatsApp"
                testId="link-whatsapp-hero"
              >
                <MessageCircle size={18} /> Quero deixar impecável
              </WhatsAppLink>
              <a href="#servicos" className="button button-outline-light" data-testid="link-hero-services">
                Ver serviços <ArrowDown size={17} />
              </a>
            </div>
            <div className="hero-meta">
              <span><MapPin size={15} /> Jardim Carvalho</span>
              <span><Phone size={15} /> {siteConfig.phoneDisplay}</span>
            </div>
          </div>
          <div className="hero-visual animate-slide">
            <div className="hero-brand-backdrop" aria-hidden="true">
              <img src="/autobrilho-logo-transparent.png" alt="" />
            </div>
            <div className="hero-image-frame">
              <img src="/autobrilho-detailing-hero-enhanced.jpg" alt="Imagem ilustrativa de um carro com pintura brilhante em um estúdio de detalhamento" />
              <div className="image-note"><span>Imagem ilustrativa</span><br />não representa um serviço realizado pela AutoBrilho</div>
            </div>
            <div className="hero-stamp"><Sparkles size={17} /><span>Detalhe<br />que fica</span></div>
            <div className="hero-coordinate">25°05' S<br />50°09' O</div>
          </div>
        </div>
        <div className="hero-bottom-line"><span>01</span><i /><span>Escolha como continuar</span><i /><span>Scroll</span></div>
      </section>

      <section id="objetivos" className="objective-section" aria-label="Escolha como continuar">
        <div className="section-wrap entry-options">
          <WhatsAppLink
            message="Olá! Sou lojista e gostaria de conversar sobre os serviços da AutoBrilho para minha loja."
            source="retailer"
            service="Atendimento para lojistas"
            className="entry-choice entry-choice-retailer"
            ariaLabel="Sou lojista. Falar com a AutoBrilho pelo WhatsApp"
            testId="link-whatsapp-retailer"
          >
            <span className="entry-choice-icon"><Store size={21} /></span>
            <span className="entry-choice-label">Sou lojista</span>
            <ArrowRight size={20} />
          </WhatsAppLink>
          <button
            type="button"
            className="entry-choice entry-choice-service"
            onClick={() => scrollTo('servicos')}
            data-testid="button-choose-service"
          >
            <span className="entry-choice-icon"><Sparkles size={21} /></span>
            <span className="entry-choice-label">Quero escolher um serviço</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </section>

      <section id="servicos" className="services-section">
        <div className="section-wrap">
          <div className="section-intro service-intro">
            <div>
              <div className="eyebrow"><span /> Possibilidades para conversar</div>
              <h2>Um ponto de partida<br /><strong>para o seu carro.</strong></h2>
            </div>
            <div className="service-disclaimer">
              <ClipboardList size={19} />
              <p>Escolha um serviço e fale diretamente com a AutoBrilho. Disponibilidade, escopo, preço e duração são confirmados pelo estúdio após entender o veículo.</p>
            </div>
          </div>
          <div className="service-list service-grid">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <article className="service-row" key={service.id} data-testid={`card-service-${service.id}`}>
                  <WhatsAppLink
                    message={service.message}
                    source="service"
                    service={service.name}
                    className="service-card-body"
                    ariaLabel={`Falar sobre ${service.name} no WhatsApp`}
                    testId={`link-whatsapp-service-${service.id}`}
                  >
                    <div className="service-card-heading">
                      <div className="service-icon"><Icon size={20} strokeWidth={1.6} /></div>
                      <span className="service-cue">{service.cue}</span>
                    </div>
                    <div className="service-info">
                      <h3>{service.name}</h3>
                      <p>{service.description}</p>
                    </div>
                    <p className="service-price">Valor sob consulta</p>
                    <span className="service-action"><span>Falar no WhatsApp</span><ArrowUpRight aria-hidden="true" /></span>
                  </WhatsAppLink>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="metodo" className="method-section">
        <div className="section-wrap method-grid">
          <div className="method-art">
            <div className="method-art-inner">
              <img src="/autobrilho-logo-clean.png" alt="Marca AutoBrilho" />
              <span className="method-art-label">Cuidado<br />sem pacote pronto</span>
            </div>
            <span className="method-vertical">AUTOBRILHO / PONTA GROSSA</span>
          </div>
          <div className="method-copy">
            <div className="eyebrow"><span /> Como começa</div>
            <h2>Mais que limpeza.<br /><strong>É leitura do detalhe.</strong></h2>
            <p className="method-lede">O primeiro passo não é escolher uma promessa. É explicar o que incomoda, o que você espera e como está o seu veículo.</p>
            <div className="method-steps">
              <div><b>01</b><span><strong>Você conta</strong> o objetivo, o tipo de veículo e o que merece atenção.</span></div>
              <div><b>02</b><span><strong>Bruno orienta</strong> o que faz sentido avaliar com o estúdio.</span></div>
              <div><b>03</b><span><strong>Você decide</strong> com clareza antes de combinar o próximo passo.</span></div>
            </div>
            <WhatsAppLink
              message="Olá! Gostaria de fazer uma avaliação do meu carro para saber qual serviço é mais indicado."
              source="benefits"
              className="button button-dark"
              testId="link-whatsapp-assessment"
            >
              Quero avaliar meu carro <ArrowRight size={17} />
            </WhatsAppLink>
          </div>
        </div>
      </section>

      <section className="faq-section">
        <div className="section-wrap faq-grid">
          <div>
            <div className="eyebrow"><span /> Antes de chamar</div>
            <h2>Respostas<br /><strong>diretas.</strong></h2>
            <p className="faq-intro">Quando uma informação depender do veículo ou da agenda, a AutoBrilho confirma com você pelo WhatsApp.</p>
          </div>
          <div className="faq-list">
            {faqItems.map((item) => {
              const isOpen = openFaq === item.question;
              return (
                <div className={`faq-item ${isOpen ? 'is-open' : ''}`} key={item.question}>
                  <button onClick={() => setOpenFaq(isOpen ? null : item.question)} aria-expanded={isOpen} data-testid={`button-faq-${item.question.replace(/\W+/g, '-').toLowerCase()}`}>
                    <span>{item.question}</span><ChevronDown size={18} />
                  </button>
                  {isOpen && <p data-testid="text-faq-answer">{item.answer}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="endereco" className="location-section">
        <div className="location-map-block">
          <iframe
            className="location-map-embed"
            src={siteConfig.mapsEmbedUrl}
            title="Mapa da AutoBrilho em Jardim Carvalho, Ponta Grossa"
            loading="lazy"
            allowFullScreen
          />
        </div>
        <div className="location-copy">
          <div className="eyebrow"><span /> Onde estamos</div>
          <h2>Seu próximo cuidado<br /><strong>começa aqui.</strong></h2>
          <p className="address-line"><MapPin size={19} /> {siteConfig.address}</p>
          <div className="location-actions">
            <a href={siteConfig.mapsUrl} target="_blank" rel="noopener noreferrer" className="button button-dark" data-testid="link-google-maps">
              <Navigation size={16} /> Ver localização <ExternalLink size={14} />
            </a>
            <a href={`tel:+${siteConfig.whatsappPhone}`} className="phone-link" data-testid="link-phone"><Phone size={16} /> {siteConfig.phoneDisplay}</a>
          </div>
          <p className="location-note">Informações de atendimento, disponibilidade e condições são confirmadas diretamente com o estúdio.</p>
        </div>
      </section>

      <section id="privacidade" className="privacy-section" aria-labelledby="privacy-heading">
        <div className="section-wrap privacy-grid">
          <div className="privacy-intro">
            <div className="eyebrow"><span /> Privacidade e segurança</div>
            <h2 id="privacy-heading">Transparência<br /><strong>em cada conversa.</strong></h2>
            <p>Este aviso descreve como o site institucional da AutoBrilho trata dados hoje.</p>
            <div className="privacy-security-note">
              <ShieldCheck size={19} />
              <span>Site público, sem cadastro, painel de clientes ou armazenamento de dados financeiros.</span>
            </div>
          </div>
          <div className="privacy-content">
            <article className="privacy-point">
              <h3>O que este site solicita</h3>
              <p>O site não pede nem armazena CPF, dados bancários, senhas bancárias ou tokens bancários. Os botões abrem o WhatsApp com uma mensagem preparada; ela só é enviada se você revisar e tocar em enviar. A conversa acontece fora deste site.</p>
            </article>
            <article className="privacy-point">
              <h3>Retenção e segurança</h3>
              <p>Não guardamos mensagens nem mantemos cadastro de clientes. O contador antiabuso usa o endereço de origem apenas em memória por até 15 minutos. Os logs técnicos da aplicação registram identificador, método, rota sem parâmetros, status e duração — sem IP, cookies ou conteúdo da conversa. A Replit retém os logs da publicação por 30 dias, conforme sua documentação oficial.</p>
            </article>
            <article className="privacy-point">
              <h3>Seus direitos e contato</h3>
              <p>Para dúvidas ou solicitações sobre dados que você tenha compartilhado com a AutoBrilho, fale diretamente com o estúdio pelo WhatsApp.</p>
              <WhatsAppLink
                message="Olá! Gostaria de fazer uma solicitação relacionada à privacidade dos meus dados pessoais."
                source="privacy"
                className="privacy-contact"
                ariaLabel="Falar com a AutoBrilho sobre privacidade pelo WhatsApp"
                testId="link-whatsapp-privacy"
              >
                Solicitar atendimento sobre privacidade <ArrowRight size={16} />
              </WhatsAppLink>
            </article>
            <div className="privacy-sources">
              <span>Consultar informações oficiais</span>
              <a href="https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm" target="_blank" rel="noopener noreferrer" data-testid="link-lgpd-official">
                Lei Geral de Proteção de Dados <ExternalLink size={14} />
              </a>
              <a href="https://www.gov.br/anpd/pt-br" target="_blank" rel="noopener noreferrer" data-testid="link-anpd-official">
                Autoridade Nacional de Proteção de Dados <ExternalLink size={14} />
              </a>
              <a href="https://docs.replit.com/features/publishing/monitoring-a-deployment" target="_blank" rel="noopener noreferrer" data-testid="link-replit-logs-policy">
                Retenção de logs da Replit <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-top section-wrap">
          <BrandMark />
          <div className="footer-callout"><span>Uma recomendação clara está a uma conversa.</span><WhatsAppLink message="Olá! Vim pelo site e gostaria de receber uma recomendação de serviço para o meu veículo." source="final" className="text-link light-link" testId="link-whatsapp-final">Falar com especialista <ArrowRight size={15} /></WhatsAppLink></div>
        </div>
        <div className="footer-bottom section-wrap">
          <span>© {new Date().getFullYear()} AutoBrilho · Ponta Grossa, PR</span>
          <span>Atendimento direto com {siteConfig.owner}</span>
          <a href="#privacidade" className="footer-privacy-link">Privacidade e dados</a>
        </div>
      </footer>

      <WhatsAppLink
        message="Olá! Vim pelo site da AutoBrilho e gostaria de saber qual serviço é mais indicado para o meu carro."
        source="floating"
        className="floating-whatsapp"
        ariaLabel="Falar no WhatsApp"
        testId="link-whatsapp-floating"
      >
        <MessageCircle size={20} /><span>Falar no WhatsApp</span>
      </WhatsAppLink>
    </main>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;