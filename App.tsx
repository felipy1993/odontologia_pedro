





import React, { useState, useEffect } from 'react';
import { db, auth } from './firebase';
import { Dentist, Theme, Layout, Service, Testimonial, SocialLinks, GalleryImage } from './types';
import { INITIAL_DENTISTS, INITIAL_EDITABLE_CONTENT, INITIAL_SERVICES, INITIAL_TESTIMONIALS, INITIAL_SOCIAL_LINKS, INITIAL_GALLERY_IMAGES } from './constants';

import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Treatments from './components/Treatments';
import Team from './components/Team';
import Testimonials from './components/Testimonials';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import AdminPanel from './components/AdminPanel';
import ManagementModal from './components/ManagementModal';
import UndoToast from './components/UndoToast';
import LoadingSpinner from './components/LoadingSpinner';
import ScrollToTopButton from './components/ScrollToTopButton';
import { useImageUploader } from './hooks/useImageUploader';

type ManagementTarget = 'dentists' | 'services' | 'testimonials' | null;

const App: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [loginError, setLoginError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    
    // State Management (initialized with constants, will be overwritten by Firebase)
    const [dentists, setDentists] = useState<Dentist[]>(INITIAL_DENTISTS);
    const [services, setServices] = useState<Service[]>(INITIAL_SERVICES);
    const [testimonials, setTestimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);
    const [galleryImages, setGalleryImages] = useState<GalleryImage[]>(INITIAL_GALLERY_IMAGES);
    const [heroImage, setHeroImage] = useState('https://images.unsplash.com/photo-1599321666498-b8a74e507b67?auto=format&fit=crop&w=1920&q=80');
    const [editableContent, setEditableContent] = useState<Record<string, string>>(INITIAL_EDITABLE_CONTENT);
    const [socialLinks, setSocialLinks] = useState<SocialLinks>(INITIAL_SOCIAL_LINKS);
    const [managementModal, setManagementModal] = useState<ManagementTarget>(null);
    const [toast, setToast] = useState<{ message: string; onUndo: () => void } | null>(null);

    // UI Customization State
    const [isEditMode, setIsEditMode] = useState(false);
    const [theme, setTheme] = useState<Theme>(Theme.Light);
    const [layout, setLayout] = useState<Layout>(Layout.Default);
    const [primaryColor, setPrimaryColor] = useState('#0D2C54');
    const [heroTitleFontSize, setHeroTitleFontSize] = useState<number>(96);

    // Reference to the Firestore document
    const docRef = db.collection('siteContent').doc('main');

    // Hook for handling image uploads via URL prompt
    const { triggerUpload } = useImageUploader();

    // Effect to fetch and listen for real-time data from Firestore
    useEffect(() => {
        const unsubscribe = docRef.onSnapshot((snapshot) => {
            if (snapshot.exists) {
                const data = snapshot.data();
                if (data) {
                    setDentists(data.dentists || INITIAL_DENTISTS);
                    setServices(data.services || INITIAL_SERVICES);
                    setTestimonials(data.testimonials || INITIAL_TESTIMONIALS);
                    setGalleryImages(data.galleryImages || INITIAL_GALLERY_IMAGES);
                    setHeroImage(data.heroImage || '');
                    setEditableContent(data.editableContent || INITIAL_EDITABLE_CONTENT);
                    setSocialLinks(data.socialLinks || INITIAL_SOCIAL_LINKS);
                    setTheme(data.theme || Theme.Light);
                    setLayout(data.layout || Layout.Default);
                    setPrimaryColor(data.primaryColor || '#0D2C54');
                    setHeroTitleFontSize(data.heroTitleFontSize || 96);
                }
            } else {
                // If the document doesn't exist, create it with initial data
                docRef.set({
                    dentists: INITIAL_DENTISTS,
                    services: INITIAL_SERVICES,
                    testimonials: INITIAL_TESTIMONIALS,
                    galleryImages: INITIAL_GALLERY_IMAGES,
                    heroImage: 'https://images.unsplash.com/photo-1599321666498-b8a74e507b67?auto=format&fit=crop&w=1920&q=80',
                    editableContent: INITIAL_EDITABLE_CONTENT,
                    socialLinks: INITIAL_SOCIAL_LINKS,
                    theme: Theme.Light,
                    layout: Layout.Default,
                    primaryColor: '#0D2C54',
                    heroTitleFontSize: 96,
                });
            }
            setIsLoading(false);
        }, (error) => {
            console.error("Error fetching data from Firestore:", error);
            setIsLoading(false);
        });
        return () => unsubscribe();
    }, []);

    // Effect to listen for auth state changes
     useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setIsLoggedIn(!!user);
            if (!user) {
                setIsEditMode(false); // Turn off edit mode on logout
            }
        });
        return () => unsubscribe();
    }, []);


    // Effect to apply visual theme changes to the DOM
    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty('--primary', primaryColor);
        root.classList.remove('theme-dark', 'theme-pastel');
        if (theme === Theme.Dark) {
            root.classList.add('theme-dark');
        } else if (theme === Theme.Pastel) {
            root.classList.add('theme-pastel');
        }
    }, [theme, primaryColor]);


    const handleLogin = (email: string, pass: string) => {
        setLoginError(null);
        auth.signInWithEmailAndPassword(email, pass)
            .then(() => setShowLoginModal(false))
            .catch((error: any) => {
                console.error("Firebase login error:", error);
                if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
                    setLoginError('E-mail ou senha incorretos.');
                } else {
                    setLoginError('Ocorreu um erro. Tente novamente.');
                }
            });
    };

    const handleToggleEditMode = () => setIsEditMode(prev => !prev);
    
    // Generic Content Handlers that write to Firestore
    const handleContentChange = (id: string, value: string) => {
        setEditableContent(prev => ({...prev, [id]: value})); // Optimistic update
        docRef.update({ [`editableContent.${id}`]: value }).catch(console.error);
    };

    // Handlers for UI customization that persist to Firestore
    const handleThemeChange = (newTheme: Theme) => {
        setTheme(newTheme);
        docRef.update({ theme: newTheme }).catch(console.error);
    };

    const handleLayoutChange = (newLayout: Layout) => {
        setLayout(newLayout);
        docRef.update({ layout: newLayout }).catch(console.error);
    };

    const handlePrimaryColorChange = (newColor: string) => {
        setPrimaryColor(newColor);
        docRef.update({ primaryColor: newColor }).catch(console.error);
    };

    const handleHeroTitleFontSizeChange = (newSize: number) => {
        setHeroTitleFontSize(newSize);
        docRef.update({ heroTitleFontSize: newSize }).catch(console.error);
    };

    // FIX: Changed handleUpdateItem to use a more specific two-parameter generic
    // signature (<T, K>) to correctly infer the types of `field` and `value`.
    // This resolves TypeScript errors when passing string literals for the `field` argument.
    const handleUpdateItem = async <T extends { id: number }, K extends keyof T>(
        collectionField: keyof SiteData,
        items: T[],
        id: number,
        field: K,
        value: T[K]
    ) => {
        const updatedItems = items.map(item => item.id === id ? { ...item, [field]: value } : item);
        await docRef.update({ [collectionField]: updatedItems });
    };

    const handleDeleteItem = async <T extends { id: number }>(
        collectionField: keyof SiteData,
        items: T[],
        id: number
    ) => {
        const itemToDelete = items.find(item => item.id === id);
        const originalIndex = items.findIndex(item => item.id === id);
        if (!itemToDelete || originalIndex === -1) return;

        const updatedItems = items.filter(item => item.id !== id);
        await docRef.update({ [collectionField]: updatedItems });

        const handleUndo = () => {
            const restoredItems = [
                ...updatedItems.slice(0, originalIndex),
                itemToDelete,
                ...updatedItems.slice(originalIndex)
            ];
            docRef.update({ [collectionField]: restoredItems });
            setToast(null);
        };

        setToast({
            message: 'Item excluído.',
            onUndo: handleUndo
        });
    };
    
    const handleAddItem = async <T extends { id: number }>(
        collectionField: keyof SiteData,
        items: T[],
        newItem: Omit<T, 'id'>
    ) => {
        const itemWithId = { ...newItem, id: Date.now() } as T;
        await docRef.update({ [collectionField]: [...items, itemWithId] });
    };

    const handleAddGalleryItem = async () => {
        const newSrc = await triggerUpload('images/gallery');
        if (newSrc) {
            const newItem: Omit<GalleryImage, 'id'> = {
                src: newSrc,
                caption: 'Nova legenda',
            };
            handleAddItem('galleryImages', galleryImages, newItem);
        }
    };

    const handleGalleryImageChange = (id: number, newSrc: string) => {
        // FIX: Explicitly provide generic type arguments to handleUpdateItem to resolve a TypeScript inference issue.
        handleUpdateItem<GalleryImage, 'src'>('galleryImages', galleryImages, id, 'src', newSrc);
    };

    const handleChangeHeroImage = (newSrc: string) => {
        docRef.update({ heroImage: newSrc });
    };
    
    const handleSocialLinksChange = (links: SocialLinks) => {
        setSocialLinks(links); // Optimistic update
        docRef.update({ socialLinks: links }).catch(console.error);
    };

    const handleDentistAvatarChange = (id: number, newSrc: string) => {
        // FIX: Explicitly provide generic type arguments to handleUpdateItem to resolve a TypeScript inference issue.
        handleUpdateItem<Dentist, 'avatar'>('dentists', dentists, id, 'avatar', newSrc);
    };

    const handleTestimonialAvatarChange = (id: number, newSrc: string) => {
        handleUpdateItem<Testimonial, 'avatar'>('testimonials', testimonials, id, 'avatar', newSrc);
    };

    const containerClass = layout === Layout.Compact ? 'px-4 max-w-5xl' : layout === Layout.Wide ? 'px-6 max-w-7xl' : 'px-5 max-w-6xl';

    const renderManagementModal = () => {
        if (!managementModal) return null;
        switch (managementModal) {
            case 'dentists':
                // FIX: Specify the generic type for ManagementModal to ensure type safety for the new item.
                return <ManagementModal<Omit<Dentist, 'id'>>
                    isOpen={true}
                    onClose={() => setManagementModal(null)}
                    title="Adicionar Novo Dentista"
                    fields={[
                        { name: 'name', label: 'Nome', type: 'text' },
                        { name: 'initials', label: 'Iniciais', type: 'text' },
                        { name: 'specialty', label: 'Especialidade e CRO', type: 'text' },
                        { name: 'description', label: 'Descrição', type: 'textarea' },
                        { name: 'avatar', label: 'URL da Foto', type: 'text' },
                    ]}
                    onSave={(newItem) => handleAddItem('dentists', dentists, newItem)}
                />;
            case 'services':
                // FIX: Specify the generic type for ManagementModal to ensure type safety for the new item.
                return <ManagementModal<Omit<Service, 'id'>>
                    isOpen={true}
                    onClose={() => setManagementModal(null)}
                    title="Adicionar Novo Tratamento"
                    fields={[
                        { name: 'title', label: 'Título', type: 'text' },
                        { name: 'description', label: 'Descrição', type: 'textarea' },
                    ]}
                    onSave={(newItem) => handleAddItem('services', services, newItem)}
                />;
            case 'testimonials':
                return <ManagementModal<Omit<Testimonial, 'id'>>
                    isOpen={true}
                    onClose={() => setManagementModal(null)}
                    title="Adicionar Novo Depoimento"
                    fields={[
                        { name: 'quote', label: 'Depoimento', type: 'textarea' },
                        { name: 'author', label: 'Autor', type: 'text' },
                        { name: 'rating', label: 'Avaliação (1-5)', type: 'text' },
                        { name: 'avatar', label: 'URL da Foto (Opcional)', type: 'text' },
                    ]}
                    onSave={(newItem) => {
                         const finalItem = { 
                            ...newItem, 
                            rating: Math.max(1, Math.min(5, Number((newItem as any).rating) || 5)) // Clamp rating between 1 and 5
                        };
                        handleAddItem('testimonials', testimonials, finalItem as any);
                    }}
                />;
            default: return null;
        }
    };


    return (
        <div className="font-sans bg-theme-bg text-theme-text transition-colors duration-300">
            {isLoading && <LoadingSpinner fullScreen />}
            <Header containerClass={containerClass} />
            
            {isLoggedIn && (
                <AdminPanel 
                    onToggleEditMode={handleToggleEditMode}
                    isEditMode={isEditMode}
                    theme={theme}
                    onThemeChange={handleThemeChange}
                    layout={layout}
                    onLayoutChange={handleLayoutChange}
                    primaryColor={primaryColor}
                    onPrimaryColorChange={handlePrimaryColorChange}
                    heroTitleFontSize={heroTitleFontSize}
                    onHeroTitleFontSizeChange={handleHeroTitleFontSizeChange}
                    socialLinks={socialLinks}
                    setSocialLinks={handleSocialLinksChange}
                    onLogout={() => auth.signOut()}
                />
            )}
            
            <main>
                <Hero 
                  imageSrc={heroImage}
                  title={editableContent['hero-title']}
                  lead={editableContent['hero-lead']}
                  isEditMode={isEditMode}
                  onContentChange={handleContentChange}
                  onImageChange={handleChangeHeroImage}
                  containerClass={containerClass}
                  heroTitleFontSize={heroTitleFontSize}
                />
                <About 
                    content={editableContent['about-p1']}
                    isEditMode={isEditMode}
                    onContentChange={(newValue) => handleContentChange('about-p1', newValue)}
                    containerClass={containerClass} 
                />
                <Treatments 
                    services={services} 
                    isEditMode={isEditMode}
                    onUpdate={(id, field, value) => handleUpdateItem('services', services, id, field, value)}
                    onDelete={(id) => handleDeleteItem('services', services, id)}
                    onAdd={() => setManagementModal('services')}
                    containerClass={containerClass} 
                />
                <Team 
                    dentists={dentists} 
                    isEditMode={isEditMode}
                    onUpdate={(id, field, value) => handleUpdateItem('dentists', dentists, id, field, value)}
                    onDelete={(id) => handleDeleteItem('dentists', dentists, id)}
                    onAdd={() => setManagementModal('dentists')}
                    onAvatarChange={handleDentistAvatarChange}
                    containerClass={containerClass}
                />
                <Testimonials 
                    testimonials={testimonials} 
                    isEditMode={isEditMode}
                    onUpdate={(id, field, value) => handleUpdateItem('testimonials', testimonials, id, field, value)}
                    onDelete={(id) => handleDeleteItem('testimonials', testimonials, id)}
                    onAdd={() => setManagementModal('testimonials')}
                    onAvatarChange={handleTestimonialAvatarChange}
                    containerClass={containerClass} 
                />
                <Gallery
                    galleryImages={galleryImages}
                    isEditMode={isEditMode}
                    onUpdate={(id, field, value) => handleUpdateItem('galleryImages', galleryImages, id, field, value)}
                    onDelete={(id) => handleDeleteItem('galleryImages', galleryImages, id)}
                    onAdd={handleAddGalleryItem}
                    onImageChange={handleGalleryImageChange}
                    containerClass={containerClass}
                />
                <Contact
                    content={editableContent['contact-p1']}
                    isEditMode={isEditMode}
                    onContentChange={(newValue) => handleContentChange('contact-p1', newValue)}
                    containerClass={containerClass} 
                />
            </main>

            <Footer onAdminClick={() => setShowLoginModal(true)} socialLinks={socialLinks} containerClass={containerClass} />
            <ScrollToTopButton />

            {showLoginModal && <LoginModal onLogin={handleLogin} onCancel={() => { setShowLoginModal(false); setLoginError(null); }} error={loginError} />}
            {renderManagementModal()}
            {toast && (
                <UndoToast
                    message={toast.message}
                    onUndo={toast.onUndo}
                    onClose={() => setToast(null)}
                />
            )}
        </div>
    );
};

// Helper type for Firestore document structure
interface SiteData {
    dentists: Dentist[];
    services: Service[];
    testimonials: Testimonial[];
    galleryImages: GalleryImage[];
    heroImage: string;
    editableContent: Record<string, string>;
    socialLinks: SocialLinks;
    theme: Theme;
    layout: Layout;
    primaryColor: string;
    heroTitleFontSize: number;
}


export default App;