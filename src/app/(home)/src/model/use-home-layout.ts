import { useMemo } from "react";
import type { Session } from "@/store/use-create-content-store";
import { useCreateContentStore } from "@/store/use-create-content-store";

const isSessionValid = (session: Session): boolean => {
  if (!session.date) return false;
  if (!session.description || session.description.length < 8) return false;

  return true;
};

export const useHomeLayout = () => {
  const categories = useCreateContentStore((state) => state.categories);
  const title = useCreateContentStore((state) => state.title);
  const meetingType = useCreateContentStore((state) => state.meetingType);
  const sessions = useCreateContentStore((state) => state.sessions);
  const mainImageId = useCreateContentStore((state) => state.mainImageId);

  const nextDisabled = useMemo(() => {
    if (categories.length < 1) return true;

    if (!title || title.length < 8) return true;

    if (!meetingType) return true;

    if (!mainImageId) return true;

    if (sessions.length < 1) return true;
    if (!sessions.every(isSessionValid)) return true;

    return false;
  }, [categories, title, meetingType, sessions, mainImageId]);

  return { nextDisabled };
};
