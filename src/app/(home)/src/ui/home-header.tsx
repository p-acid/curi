"use client";

import { Header } from "@/layouts/header";
import { useHomeLayout } from "../model";

export const HomeHeader = () => {
  const { nextDisabled } = useHomeLayout();
  return <Header title="과제" nextDisabled={nextDisabled} />;
};
