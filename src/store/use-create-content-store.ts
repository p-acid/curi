import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type MeetingType = "online" | "offline";

export interface Session {
  id: string;
  date: string;
  startTime: {
    period: "am" | "pm";
    hour: number;
    minute: number;
  };
  endTime: {
    period: "am" | "pm";
    hour: number;
    minute: number;
  };
  description: string;
}

export interface CreateContentState {
  categories: string[];
  title: string;
  meetingType: MeetingType | null;
  sessions: Session[];

  setCategories: (category: string[]) => void;
  setTitle: (title: string) => void;
  setMeetingType: (type: MeetingType) => void;
  addSession: (session: Omit<Session, "id">) => void;
  updateSession: (id: string, session: Partial<Omit<Session, "id">>) => void;
  removeSession: (id: string) => void;
  reset: () => void;
}

const initialState = {
  categories: [],
  title: "",
  meetingType: null,
  sessions: [
    {
      id: crypto.randomUUID(),
      date: new Date().toString(),
      startTime: {
        period: "am" as const,
        hour: 0,
        minute: 0,
      },
      endTime: {
        period: "am" as const,
        hour: 0,
        minute: 0,
      },
      description: "",
    },
  ],
};

export const useCreateContentStore = create<CreateContentState>()(
  persist(
    (set) => ({
      ...initialState,

      setCategories: (categories: string[]) => set({ categories }),

      setTitle: (title: string) => set({ title }),

      setMeetingType: (type: MeetingType) => set({ meetingType: type }),

      addSession: (session: Omit<Session, "id">) =>
        set((state) => ({
          sessions: [
            ...state.sessions,
            {
              ...session,
              id: crypto.randomUUID(),
            },
          ],
        })),

      updateSession: (
        id: string,
        updatedSession: Partial<Omit<Session, "id">>,
      ) =>
        set((state) => ({
          sessions: state.sessions.map((session) =>
            session.id === id ? { ...session, ...updatedSession } : session,
          ),
        })),

      removeSession: (id: string) =>
        set((state) => ({
          sessions: state.sessions.filter((session) => session.id !== id),
        })),

      reset: () => set(initialState),
    }),
    {
      name: "create-content-storage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
