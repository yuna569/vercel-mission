import { create } from "zustand";
import type { IStore } from "../Stores/Stores";

interface StoreState {
    store: IStore;
    chooseStore: (store: IStore) => void;
}

const initialState: Pick<StoreState, "store"> = {
    store: {
        id: 0,
        name: "",
        rate: 0.0,
        reviewCnt: 0,
        minDeliveryTime: 0,
        maxDeliveryTime: 0,
        minDeliveryPrice: 0,
        deliveryFee: 0,
        menus: []
    }
}
const useStoreStore = create<StoreState>((set) => ({
    store: initialState.store,
    chooseStore: (store) => { set({store}) }
}))

export default useStoreStore;
