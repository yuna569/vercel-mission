import { create } from "zustand";
import { getCategories } from "../../api/api";

interface ICategory {
  name: string;
  imgPath: string;
  path: string;
}

interface CategoryState {
  categories: ICategory[];
  fetchCategories: () => Promise<void>;
}

const initialState: Pick<CategoryState, "categories"> = {
  categories: [],
};

const useCategoryStore = create<CategoryState>((set) => ({
  categories: initialState.categories,

  fetchCategories: async () => {
    const data = await getCategories();
    set({ categories: data });
  },
}));

export default useCategoryStore;
