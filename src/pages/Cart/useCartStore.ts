import { create } from "zustand";
import type { Menu } from "../../components/MenuItem/MenuItem";

interface CartState {
    menus: Menu[];
    count: number[];
    addMenu: (menu: Menu) => void;
    emptyMenu: () => void;
    addCount: (id: number) => void;
}

const initialState: Pick<CartState, "menus" | "count"> = {
    menus: [],
    count: [],
}

const useCartStore = create<CartState>((set) => ({
    menus: initialState.menus,
    count: initialState.count,

    addMenu: (menu) => {
        set( (state) => {
            const newCount = [...state.count];
            newCount[menu.id] = 1;

            return {
                ...state,
                menus: [...state.menus, menu],
                count: newCount
            }
        });
    },

    emptyMenu: () => {
        set(initialState)
    },

    addCount: (id) => {
        set( (state) => {
            const newCount = [...state.count];
            newCount[id] = (newCount[id] ?? 0) + 1;

            return {
                ...state,
                count: newCount,
            };
        });
    },

}))

export default useCartStore;