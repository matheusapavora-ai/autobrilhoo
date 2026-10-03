import {
  CarFront,
  Droplets,
  Gauge,
  Lightbulb,
  ShieldCheck,
  Sparkles,
  SprayCan,
  type LucideIcon,
} from 'lucide-react';

export const siteConfig = {
  company: 'AutoBrilho',
  descriptor: 'Diferencial automotivo',
  owner: 'Bruno Marquiori',
  phoneDisplay: '(42) 99127-0678',
  whatsappPhone: '5542991270678',
  address: 'R. Carlos Chagas, 100 — Jardim Carvalho, Ponta Grossa — PR',
  mapsEmbedUrl: 'https://www.google.com/maps?q=-25.0833893%2C-50.1479454&z=16&output=embed',
  mapsUrl:
    'https://www.google.com/maps/place/Auto+brilho+diferencial+automotivo/@-25.0825363,-50.1471013,16z/data=!4m15!1m8!3m7!1s0x94e81a36b2b96815:0x77f80503db116c52!2sR.+Carlos+Chagas,+100+-+Jardim+Carvalho,+Ponta+Grossa+-+PR,+84016-060!3b1!8m2!3d-25.0833914!4d-50.1479381!16s%2Fg%2F11f315sfhm!3m5!1s0x94e81bc665c86a63:0x812191f1af5dc850!8m2!3d-25.0833893!4d-50.1479454!16s%2Fg%2F11myr1_b9l?entry=ttu&g_ep=EgoyMDI2MDkyMi4wIKXMDSoASAFQAw%3D%3D',
} as const;

export type ServiceId =
  | 'lavagem-convencional'
  | 'lavagem-completa'
  | 'detalhamento'
  | 'polimento'
  | 'vitrificacao'
  | 'farois'
  | 'higienizacao';

export type ServiceOption = {
  id: ServiceId;
  name: string;
  shortName: string;
  description: string;
  cue: string;
  icon: LucideIcon;
  message: string;
};

export const services: ServiceOption[] = [
  {
    id: 'lavagem-convencional',
    name: 'Lavagem convencional',
    shortName: 'Lavagem',
    description: 'Limpeza externa para manter o veículo bem cuidado no dia a dia.',
    cue: 'Manutenção',
    icon: Droplets,
    message: 'Olá! Tenho interesse na Lavagem Convencional. Gostaria de saber os horários disponíveis para agendamento.',
  },
  {
    id: 'lavagem-completa',
    name: 'Lavagem completa',
    shortName: 'Completa',
    description: 'Um cuidado mais detalhado para devolver presença e aparência renovada.',
    cue: 'Renovação',
    icon: SprayCan,
    message: 'Olá! Tenho interesse na Lavagem Completa. Gostaria de saber o valor e os horários disponíveis.',
  },
  {
    id: 'detalhamento',
    name: 'Detalhamento automotivo',
    shortName: 'Detalhamento',
    description: 'Para quem busca atenção nos detalhes e um acabamento mais apurado.',
    cue: 'Acabamento',
    icon: Sparkles,
    message: 'Olá! Tenho interesse no Detalhamento Automotivo. Gostaria de receber informações sobre valores e disponibilidade.',
  },
  {
    id: 'polimento',
    name: 'Polimento',
    shortName: 'Polimento',
    description: 'Tratamento da pintura para avaliar brilho, acabamento e aparência.',
    cue: 'Pintura',
    icon: Gauge,
    message: 'Olá! Tenho interesse em fazer Polimento no meu veículo. Gostaria de saber como funciona a avaliação e o orçamento.',
  },
  {
    id: 'vitrificacao',
    name: 'Vitrificação',
    shortName: 'Vitrificação',
    description: 'Uma conversa sobre proteção de pintura e acabamento de alto brilho.',
    cue: 'Proteção',
    icon: ShieldCheck,
    message: 'Olá! Tenho interesse em Vitrificação Automotiva. Gostaria de saber as opções, valores e disponibilidade.',
  },
  {
    id: 'farois',
    name: 'Polimento de faróis',
    shortName: 'Faróis',
    description: 'Avaliação para recuperar a aparência dos faróis e o acabamento visual.',
    cue: 'Detalhe',
    icon: Lightbulb,
    message: 'Olá! Tenho interesse no Polimento de Faróis. Gostaria de saber o valor e como funciona o serviço.',
  },
  {
    id: 'higienizacao',
    name: 'Higienização interna',
    shortName: 'Higienização',
    description: 'Limpeza profunda para renovar bancos, carpetes e acabamentos internos.',
    cue: 'Interior',
    icon: CarFront,
    message: 'Olá! Tenho interesse na Higienização Interna do veículo. Gostaria de saber o valor e a disponibilidade.',
  },
];

export const faqItems = [
  {
    question: 'Preciso agendar?',
    answer: 'Fale diretamente com o estúdio pelo WhatsApp para confirmar disponibilidade e combinar o melhor próximo passo.',
  },
  {
    question: 'Quanto tempo demora o serviço?',
    answer: 'O tempo depende do veículo e do cuidado escolhido. Bruno confirma essa informação na avaliação e no alinhamento do serviço.',
  },
  {
    question: 'Vocês atendem SUVs e picapes?',
    answer: 'Envie o tipo do seu veículo pelo WhatsApp. A conversa ajuda o estúdio a orientar o atendimento adequado.',
  },
  {
    question: 'Posso enviar fotos do veículo pelo WhatsApp?',
    answer: 'Sim. Você pode enviar fotos e explicar o que deseja observar para facilitar a recomendação.',
  },
  {
    question: 'Como funciona o orçamento?',
    answer: 'Você conta o objetivo, o tipo de veículo e o serviço de interesse. O escopo e os valores são confirmados diretamente com o estúdio.',
  },
  {
    question: 'Quais formas de pagamento vocês aceitam?',
    answer: 'Essa informação não está publicada aqui. Confirme as formas de pagamento diretamente com a AutoBrilho.',
  },
] as const;