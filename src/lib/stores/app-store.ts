import { create } from "zustand";

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

interface AppState {
  // Contact modal
  contactModalOpen: boolean;
  selectedContact: ModalContact | null;
  openContactModal: (contact: ModalContact) => void;
  closeContactModal: () => void;

  // Image modal
  imageModalOpen: boolean;
  selectedImageUrl: string | null;
  openImageModal: (imageUrl: string) => void;
  closeImageModal: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Contact modal
  contactModalOpen: false,
  selectedContact: null,
  openContactModal: (contact) =>
    set({ selectedContact: contact, contactModalOpen: true }),
  closeContactModal: () =>
    set({ contactModalOpen: false, selectedContact: null }),

  // Image modal
  imageModalOpen: false,
  selectedImageUrl: null,
  openImageModal: (imageUrl) =>
    set({ selectedImageUrl: imageUrl, imageModalOpen: true }),
  closeImageModal: () =>
    set({ imageModalOpen: false, selectedImageUrl: null }),
}));
