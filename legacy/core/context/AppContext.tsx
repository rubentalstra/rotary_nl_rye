import { createContext, use, useState, useCallback, type ReactNode } from "react";

/**
 * Contact type for the modal
 * Using a minimal interface here to avoid circular dependencies
 */
interface ModalContact {
  id: string;
  name: string;
  role?: string;
  bio?: string;
  imageUrl?: string;
  email?: string;
  phone?: string;
  whatsapp?: string;
  socialMedia?: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
    website?: string;
  };
}

interface AppContextValue {
  // Contact modal state
  contactModalOpen: boolean;
  selectedContact: ModalContact | null;

  // Contact modal actions
  openContactModal: (contact: ModalContact) => void;
  closeContactModal: () => void;

  // Image modal state
  imageModalOpen: boolean;
  selectedImageUrl: string | null;

  // Image modal actions
  openImageModal: (imageUrl: string) => void;
  closeImageModal: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  // Contact modal state
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<ModalContact | null>(null);

  // Image modal state
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);

  // Contact modal actions
  const openContactModal = useCallback((contact: ModalContact) => {
    setSelectedContact(contact);
    setContactModalOpen(true);
  }, []);

  const closeContactModal = useCallback(() => {
    setContactModalOpen(false);
    setSelectedContact(null);
  }, []);

  // Image modal actions
  const openImageModal = useCallback((imageUrl: string) => {
    setSelectedImageUrl(imageUrl);
    setImageModalOpen(true);
  }, []);

  const closeImageModal = useCallback(() => {
    setImageModalOpen(false);
    setSelectedImageUrl(null);
  }, []);

  return (
    <AppContext
      value={{
        contactModalOpen,
        selectedContact,
        openContactModal,
        closeContactModal,
        imageModalOpen,
        selectedImageUrl,
        openImageModal,
        closeImageModal,
      }}
    >
      {children}
    </AppContext>
  );
}

export function useApp(): AppContextValue {
  const context = use(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}
