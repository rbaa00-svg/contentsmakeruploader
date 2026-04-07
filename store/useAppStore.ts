import { create } from 'zustand';

export type Channel = 'instagram' | 'blog' | 'twitter' | 'youtube' | 'linkedin' | 'tiktok' | 'threads';

export interface ScheduledPost {
  id: string;
  channel: Channel;
  content: string;
  date: Date;
  status: 'scheduled' | 'published' | 'failed';
}

interface AppState {
  // Stepped Editor State
  step: number;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;

  keyword: string;
  setKeyword: (keyword: string) => void;

  concept: string;
  setConcept: (concept: string) => void;

  generatedContent: Record<Channel, string>;
  setGeneratedContent: (channel: Channel, content: string) => void;

  isGenerating: boolean;
  setIsGenerating: (isGenerating: boolean) => void;

  scheduleDate: Date | undefined;
  setScheduleDate: (date: Date | undefined) => void;
  scheduleTime: string;
  setScheduleTime: (time: string) => void;

  // Dashboard State
  snsConnections: Record<Channel, boolean>;
  toggleConnection: (channel: Channel) => void;

  scheduledPosts: ScheduledPost[];
  addScheduledPost: (post: ScheduledPost) => void;
  
  resetEditor: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  step: 1,
  setStep: (step) => set({ step }),
  nextStep: () => set((state) => ({ step: Math.min(state.step + 1, 5) })),
  prevStep: () => set((state) => ({ step: Math.max(state.step - 1, 1) })),

  keyword: '',
  setKeyword: (keyword) => set({ keyword }),

  concept: '',
  setConcept: (concept) => set({ concept }),

  generatedContent: {
    instagram: '',
    blog: '',
    twitter: '',
    youtube: '',
    linkedin: '',
    tiktok: '',
    threads: '',
  },
  setGeneratedContent: (channel, content) =>
    set((state) => ({
      generatedContent: { ...state.generatedContent, [channel]: content },
    })),

  isGenerating: false,
  setIsGenerating: (isGenerating) => set({ isGenerating }),

  scheduleDate: undefined,
  setScheduleDate: (scheduleDate) => set({ scheduleDate }),
  scheduleTime: '09:00',
  setScheduleTime: (scheduleTime) => set({ scheduleTime }),

  snsConnections: {
    instagram: true,
    blog: false,
    twitter: true,
    youtube: false,
    linkedin: true,
    tiktok: false,
    threads: true,
  },
  toggleConnection: (channel) =>
    set((state) => ({
      snsConnections: {
        ...state.snsConnections,
        [channel]: !state.snsConnections[channel],
      },
    })),

  scheduledPosts: [
    {
      id: '1',
      channel: 'instagram',
      content: 'Exciting news coming soon! #teaser',
      date: new Date(Date.now() + 86400000),
      status: 'scheduled',
    },
    {
      id: '2',
      channel: 'youtube',
      content: 'New Feature Teaser\nCheck out our latest feature in this quick sneak peek!',
      date: new Date(Date.now() + 172800000),
      status: 'scheduled',
    },
  ],
  addScheduledPost: (post) =>
    set((state) => ({
      scheduledPosts: [...state.scheduledPosts, post],
    })),

  resetEditor: () =>
    set({
      step: 1,
      keyword: '',
      concept: '',
      generatedContent: { instagram: '', blog: '', twitter: '', youtube: '', linkedin: '', tiktok: '', threads: '' },
      scheduleDate: undefined,
      scheduleTime: '09:00',
    }),
}));
