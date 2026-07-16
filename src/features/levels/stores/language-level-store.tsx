import { create } from "zustand"

export interface LanguageLevelStore {
    dialogOpen: boolean
    setDialogOpen: (open: boolean) => void
}

export const useLanguageLevelStore = create<LanguageLevelStore>((set) => ({
    dialogOpen: false,
    setDialogOpen: (open: boolean) => set({ dialogOpen: open })
}))