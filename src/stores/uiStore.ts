import { create } from 'zustand';

export type Notification = {
  id: string;
  message: string;
  level?: 'info' | 'warn' | 'error';
  createdAt: number;
};

type UiState = {
  notifications: Notification[];
  connectionState: 'connected' | 'connecting' | 'disconnected' | 'unknown';
  addNotification: (message: string, level?: Notification['level']) => string;
  removeNotification: (id: string) => void;
  setConnectionState: (s: UiState['connectionState']) => void;
};

export const useUiStore = create<UiState>((set: (partial: Partial<UiState> | ((s: UiState) => Partial<UiState>)) => void, get: () => UiState) => ({
  notifications: [],
  connectionState: 'unknown',
  addNotification(message: string, level: Notification['level'] = 'info') {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const n: Notification = { id, message, level, createdAt: Date.now() };
    set({ notifications: [...get().notifications, n] });
    // auto-remove after 8s
    setTimeout(() => set({ notifications: get().notifications.filter((x: Notification) => x.id !== id) }), 8000);
    return id;
  },
  removeNotification(id: string) {
    set({ notifications: get().notifications.filter((x: Notification) => x.id !== id) });
  },
  setConnectionState(s: UiState['connectionState']) {
    set({ connectionState: s });
  },
}));

export default useUiStore;
