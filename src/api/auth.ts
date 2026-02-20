import api from './client';
import type { User } from '../types';

export const authApi = {
  async login(username: string, password: string): Promise<{ token: string; user: User }> {
    const res = await api.post('/auth/login', { username, password });
    return res.data;
  },

  async register(username: string, password: string, displayName: string): Promise<{ token: string; user: User }> {
    const res = await api.post('/auth/register', { username, password, displayName });
    return res.data;
  },

  async canRegister(): Promise<{ canRegister: boolean; currentUsers: number; maxUsers: number }> {
    const res = await api.get('/auth/can-register');
    return res.data;
  },
};

export const userApi = {
  async getProfile() {
    const res = await api.get('/user/profile');
    return res.data;
  },

  async updateProfile(data: { displayName?: string; currentLevel?: string }) {
    const res = await api.put('/user/profile', data);
    return res.data;
  },

  async changePassword(currentPassword: string, newPassword: string) {
    const res = await api.put('/user/password', { currentPassword, newPassword });
    return res.data;
  },

  async getLeaderboard() {
    const res = await api.get('/user/leaderboard');
    return res.data;
  },
};
