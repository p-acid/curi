import { create } from "zustand";
import { toast } from "@/libs/toast";

interface CategorySelectStore {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  toggleCategory: (category: string) => void;
  reset: () => void;
}

export const useCategorySelectStore = create<CategorySelectStore>((set) => ({
  selectedCategories: [],

  setSelectedCategories: (selectedCategories) => {
    set({ selectedCategories });
  },

  toggleCategory: (category) => {
    set((state) => {
      const isSelected = state.selectedCategories.includes(category);

      if (!isSelected && state.selectedCategories.length >= 2) {
        toast("최대 2개까지만 선택 가능해요");
        return { selectedCategories: state.selectedCategories };
      }

      return {
        selectedCategories: isSelected
          ? state.selectedCategories.filter((c) => c !== category)
          : [...state.selectedCategories, category],
      };
    });
  },

  reset: () => set({ selectedCategories: [] }),
}));
