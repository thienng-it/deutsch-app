import api from './client';
import type { GameResult } from '../types';

export const progressApi = {
  async getSummary() {
    const res = await api.get('/progress/summary');
    return res.data;
  },

  async getAll() {
    const res = await api.get('/progress');
    return res.data;
  },

  async updateProgress(data: {
    contentType: string;
    contentId: string | number;
    level: string;
    score?: number;
    completed?: boolean;
  }) {
    const res = await api.post('/progress/update', data);
    return res.data;
  },

  async logSession(result: GameResult) {
    const res = await api.post('/progress/session', {
      sessionType:    result.sessionType,
      duration:       result.duration,
      score:          result.score,
      itemsPracticed: result.itemsPracticed,
    });
    return res.data;
  },

  async getAchievements() {
    const res = await api.get('/progress/achievements');
    return res.data;
  },
};
