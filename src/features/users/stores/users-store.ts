import { create } from "zustand"
import { User } from "../types/user.types"

export interface UsersStore {
    activeUser: User | null,
    setActiveUser: (user: User | null) => void
    openEditSheet: boolean,
    setOpenEditSheet: (open: boolean) => void
}

export const useUsersStore = create<UsersStore>((set) => ({
    activeUser: null,
    setActiveUser: (user) => set({ activeUser: user }),
    openEditSheet: false,
    setOpenEditSheet: (open) => set({ openEditSheet: open })
}))