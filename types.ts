export interface Dentist {
  id: number;
  initials: string;
  name: string;
  specialty: string;
  description: string;
  avatar?: string; // Optional field for dentist's photo
}

export interface Service {
  id: number;
  title: string;
  description: string;
}

export interface Testimonial {
    id: number;
    quote: string;
    author: string;
}

export interface GalleryImage {
  id: number;
  src: string;
  caption: string;
}

export interface SocialLinks {
    instagram: string;
    facebook: string;
}

export enum Theme {
  Light = 'light',
  Dark = 'dark',
  Pastel = 'pastel',
}

export enum Layout {
  Default = 'default',
  Compact = 'compact',
  Wide = 'wide',
}