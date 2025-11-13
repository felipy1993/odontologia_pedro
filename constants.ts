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
    { id: 1, quote: '“Excelente atendimento! Me senti muito à vontade desde a recepção até o final do tratamento. A Dra. é extremamente profissional e atenciosa.”', author: 'Mariana S.', rating: 5, avatar: 'https://i.pravatar.cc/150?u=mariana' },
    { id: 2, quote: '“Minha filha adorou. A Dra. Tatiane é muito calma e carinhosa com as crianças, o que fez toda a diferença. Recomendo de olhos fechados!”', author: 'Rafael L.', rating: 5, avatar: 'https://i.pravatar.cc/150?u=rafael' },
];

export const INITIAL_GALLERY_IMAGES: GalleryImage[] = [
    { id: 1, src: 'https://drive.google.com/file/d/1CO5EDAcrMDEErf91KFOwGaK0mPZ7z2-2/view?usp=sharing', caption: 'Onde o cuidado começa com um sorriso.\nNossa equipe recebe cada paciente com atenção e carinho.' },
    { id: 2, src: 'https://drive.google.com/file/d/1wx7EdwRFupYDql7s5BK9tkaA3RoCGsqC/view?usp=sharing', caption: 'Um cantinho preparado para o seu conforto.\nUm ambiente tranquilo para aguardar com leveza e bem-estar.' },
    { id: 3, src: 'https://drive.google.com/file/d/1xolVv1doMA7JPKeTemKHvNn6wAtlxDc6/view?usp=sharing', caption: 'Cada conversa é feita com escuta e empatia.\nAqui planejamos o melhor cuidado para cada sorriso.' },
    { id: 4, src: 'https://drive.google.com/file/d/1QM9uzIkgb_2U_AGooXo-dyIb779N7LsG/view?usp=sharing', caption: 'Um espaço pensado para cuidar de você com calma e delicadeza.\nAqui cada detalhe foi preparado para o seu conforto.' },
    { id: 5, src: 'https://drive.google.com/file/d/1EZOj7ngtI8gVLFWf-WyfSv1cGICFHuLp/view?usp=sharing', caption: 'Um ambiente que transmite confiança e cuidado.\nOnde cada atendimento é feito com atenção e dedicação.' },
    { id: 6, src: 'https://drive.google.com/file/d/1CO5EDAcrMDEErf91KFOwGaK0mPZ7z2-2/view?usp=sharing', caption: 'Onde o cuidado começa com um sorriso.\nNossa equipe recebe cada paciente com atenção e carinho.' },
];


export const INITIAL_EDITABLE_CONTENT: Record<string, string> = {
    'hero-title': 'Excelência em Odontologia.\nO cuidado que seu sorriso merece.',
    'hero-lead': 'Equipe de especialistas dedicados a oferecer o melhor tratamento odontológico para você e sua família.',
    'about-p1': 'Localizada em Mirassol, a Odontologia Pedro é referência em atendimento acolhedor e tratamentos de qualidade. Cuidamos do seu sorriso com empatia, técnica e tecnologia de ponta para garantir os melhores resultados.',
    'contact-p1': 'Estamos prontos para atender você. Agende sua consulta pelo WhatsApp ou ligue para nós. Venha nos conhecer e descubra um novo conceito em odontologia.',
};

export const INITIAL_SOCIAL_LINKS: SocialLinks = {
    instagram: 'https://www.instagram.com/odontologiapedro?igsh=bHVxMTR4djh5Nzg3',
};