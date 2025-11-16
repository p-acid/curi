"use client";

import Link from "next/link";
import ChevronRightIcon from "@/assets/icons/chevron-right.svg?component";
import { PAGE_ROUTES } from "@/config/page-routes";
import { cn } from "@/libs/cn";
import { useCreateContentStore } from "@/store/use-create-content-store";

const CategoryLink = () => {
  const categories = useCreateContentStore((state) => state.categories);

  return (
    <Link
      href={PAGE_ROUTES.CATEGORY}
      className="flex items-center justify-between gap-1 rounded-lg border border-[#E5E5E5] bg-background p-4 max-mobile:py-3"
    >
      <span
        className={cn(
          "font-medium text-[#8F8F8F] text-lg max-mobile:text-base",
          {
            "text-foreground": categories.length >= 1,
          },
        )}
      >
        {categories.length > 0 ? categories.join(", ") : "주제를 선정해주세요"}
      </span>
      <ChevronRightIcon className="size-7 text-foreground max-mobile:size-6" />
    </Link>
  );
};

export const CategorySelector = () => {
  return (
    <div className="box">
      <h2 className="heading-1">카테고리</h2>
      <CategoryLink />
    </div>
  );
};
