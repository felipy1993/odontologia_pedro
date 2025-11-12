import { Dentist, Service, Testimonial, SocialLinks, GalleryImage } from './types';

export const INITIAL_DENTISTS: Dentist[] = [
  {
    id: 1,
    initials: 'TB',
    name: 'Dra. Tatiane Baptista Simão',
    specialty: 'Odontopediatria — CRO 125483',
    description: 'Especialista em cuidar de sorrisos infantis com paciência, técnica e sensibilidade.\nTransforma cada atendimento em uma experiência leve e acolhedora para as crianças — sempre com foco na prevenção e no bem-estar desde os primeiros dentinhos.',
    avatar: 'https://drive.google.com/uc?export=view&id=1gdlLXgPiLiK7Zk58aSFBwpLzdI5KKGjV',
  },
];

export const INITIAL_SERVICES: Service[] = [
    { id: 1, title: 'Limpeza e Prevenção', description: 'Profilaxia, orientação e manutenção da saúde bucal.' },
    { id: 2, title: 'Restaurações Estéticas', description: 'Resinas artísticas e tratamentos conservadores.' },
    { id: 3, title: 'Clareamento Dental', description: 'Protocolos seguros para um sorriso mais branco.' },
    { id: 4, title: 'Odontopediatria', description: 'Atendimento infantil com abordagem lúdica e acolhedora.' },
    { id: 5, title: 'Tratamento de Canal', description: 'Procedimentos com controle de dor e técnica atualizada.' },
    { id: 6, title: 'Próteses e Reabilitação', description: 'Reabilitação funcional e estética com próteses modernas.' },
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
    { id: 1, quote: '“Excelente atendimento! Me senti muito à vontade desde a recepção até o final do tratamento.”', author: 'Mariana' },
    { id: 2, quote: '“Minha filha adorou. A Dra. Tatiane é muito calma e carinhosa com as crianças.”', author: 'Rafael' },
];

export const INITIAL_GALLERY_IMAGES: GalleryImage[] = [
    { id: 1, src: 'https://images.unsplash.com/photo-1629904853716-f0bc54eea481?w=800&auto=format&fit=crop&q=60', caption: 'Ambiente preparado para o seu conforto.' },
    { id: 2, src: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop&q=60', caption: 'Tecnologia de ponta para diagnósticos precisos.' },
    { id: 3, src: 'https://images.unsplash.com/photo-1594495894542-a46cc73e081a?w=800&auto=format&fit=crop&q=60', caption: 'Resultados que devolvem a confiança no seu sorriso.' },
];


export const INITIAL_EDITABLE_CONTENT: Record<string, string> = {
    'hero-title': 'Excelência em Odontologia.\nO cuidado que seu sorriso merece.',
    'hero-lead': 'Equipe de especialistas dedicados a oferecer o melhor tratamento odontológico para você e sua família.',
    'about-p1': 'Localizada em Mirassol, a Odontologia Pedro é referência em atendimento acolhedor e tratamentos de qualidade. Cuidamos do seu sorriso com empatia, técnica e tecnologia de ponta para garantir os melhores resultados.',
    'contact-p1': 'Estamos prontos para atender você. Agende sua consulta pelo WhatsApp ou ligue para nós. Venha nos conhecer e descubra um novo conceito em odontologia.',
};

export const INITIAL_SOCIAL_LINKS: SocialLinks = {
    instagram: '#',
    facebook: '#'
};