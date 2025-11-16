import { useRouter } from "next/navigation";
import { PAGE_ROUTES } from "@/config/page-routes";
import { useCreateContentStore } from "@/store/use-create-content-store";
import { useCategorySelectStore } from "./use-category-select-store";

export const useCategoryLayout = () => {
  const { push } = useRouter();

  const selectedCategories = useCategorySelectStore(
    (state) => state.selectedCategories,
  );
  const setCategories = useCreateContentStore((state) => state.setCategories);

  const nextDisabled = useCategorySelectStore(
    (state) => state.selectedCategories.length < 1,
  );

  const goNext = () => {
    setCategories(selectedCategories);
    push(PAGE_ROUTES.ROOT);
  };

  return { nextDisabled, goNext };
};
