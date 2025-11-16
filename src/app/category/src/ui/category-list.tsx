"use client";

import { Button } from "@/components";
import { CATEGORY_LIST } from "../config";
import { useCategorySelectStore } from "../model";

export const CategoryList = () => {
  const selectedCategories = useCategorySelectStore(
    (state) => state.selectedCategories,
  );

  const toggleCategory = useCategorySelectStore(
    (state) => state.toggleCategory,
  );

  return (
    <div className="box grid grid-cols-2 gap-3 space-y-0 pt-6 max-mobile:pt-4">
      {CATEGORY_LIST.map((category) => (
        <Button
          key={category}
          active={selectedCategories.includes(category)}
          color="primaryOutline"
          className="w-full"
          onClick={() => {
            toggleCategory(category);
          }}
        >
          {category}
        </Button>
      ))}
    </div>
  );
};
