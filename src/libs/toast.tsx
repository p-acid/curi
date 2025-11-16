import { toast as reactHotToast } from "react-hot-toast";
import { Toast } from "@/components/toast";

export const toast = (content: string) =>
  reactHotToast.custom(<Toast>{content}</Toast>, {
    id: "unique-toast",
  });
