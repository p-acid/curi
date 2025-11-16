"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { PAGE_ROUTES } from "@/config/page-routes";
import { Header } from "@/layouts/header";
import { useCreateContentStore } from "@/store/use-create-content-store";
import { useCategoryLayout, useCategorySelectStore } from "../model";

export const CategoryHeader = () => {
  const { push } = useRouter();

  const { nextDisabled, goNext } = useCategoryLayout();

  const prevSelectedCategories = useCreateContentStore(
    (state) => state.categories,
  );
  const setSelectedCategories = useCategorySelectStore(
    (state) => state.setSelectedCategories,
  );

  useEffect(() => {
    setSelectedCategories(prevSelectedCategories);
  }, [prevSelectedCategories, setSelectedCategories]);

  return (
    <Header
      title="카테고리"
      nextDisabled={nextDisabled}
      onNext={goNext}
      onExit={() => push(PAGE_ROUTES.ROOT)}
    />
  );
};
