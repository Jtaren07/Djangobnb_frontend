import { create } from "zustand";

interface AddPropertyModelStore {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

const useAddPropertyModel = create<AddPropertyModelStore>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false })
}));

export default useAddPropertyModel;