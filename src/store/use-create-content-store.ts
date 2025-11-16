import { create } from "zustand";

export type MeetingType = "online" | "offline";

export interface TimeValue {
  period: "am" | "pm";
  hour: number;
  minute: number;
}

export interface Session {
  id: string;
  date: string;
  startTime: TimeValue;
  endTime: TimeValue;
  description: string;
}

export interface CreateContentState {
  categories: string[];
  title: string;
  meetingType: MeetingType | null;
  sessions: Session[];
  mainImageId: string | null;
  additionalImageIds: string[];

  setCategories: (category: string[]) => void;
  setTitle: (title: string) => void;
  setMeetingType: (type: MeetingType) => void;
  addSession: (session: Omit<Session, "id">) => void;
  updateSession: (id: string, session: Partial<Omit<Session, "id">>) => void;
  removeSession: (id: string) => void;
  setMainImage: (imageId: string | null) => void;
  addAdditionalImage: (imageId: string) => void;
  removeAdditionalImage: (imageId: string) => void;
  reset: () => void;
}

const initialState = {
  categories: [],
  title: "",
  meetingType: null,
  mainImageId: null,
  additionalImageIds: [],
  sessions: [
    {
      id: crypto.randomUUID(),
      date: "",
      startTime: {
        period: "am" as const,
        hour: 10,
        minute: 0,
      },
      endTime: {
        period: "am" as const,
        hour: 11,
        minute: 0,
      },
      description: "",
    },
  ],
};

export const useCreateContentStore = create<CreateContentState>()((set) => ({
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

  updateSession: (id: string, updatedSession: Partial<Omit<Session, "id">>) =>
    set((state) => ({
      sessions: state.sessions.map((session) =>
        session.id === id ? { ...session, ...updatedSession } : session,
      ),
    })),

  removeSession: (id: string) =>
    set((state) => ({
      sessions: state.sessions.filter((session) => session.id !== id),
    })),

  setMainImage: (imageId: string | null) => set({ mainImageId: imageId }),

  addAdditionalImage: (imageId: string) =>
    set((state) => ({
      additionalImageIds: [...state.additionalImageIds, imageId],
    })),

  removeAdditionalImage: (imageId: string) =>
    set((state) => ({
      additionalImageIds: state.additionalImageIds.filter(
        (id) => id !== imageId,
      ),
    })),

  reset: () => set(initialState),
}));
