import api from './client';
import type { VocabItem, GrammarTopic, Preposition } from '../types';

export const contentApi = {
  async getVocabulary(params?: {
    level?: string;
    category?: string;
    search?: string;
    limit?: number;
    offset?: number;
  }): Promise<{ items: VocabItem[]; total: number }> {
    const res = await api.get('/content/vocabulary', { params });
    return res.data;
  },

  async getCategories(level?: string): Promise<string[]> {
    const res = await api.get('/content/vocabulary/categories', { params: { level } });
    return res.data;
  },

  async getCategoriesWithCounts(level?: string): Promise<{ category: string; count: number }[]> {
    const res = await api.get('/content/vocabulary/categories-with-counts', { params: { level } });
    return res.data;
  },

  async addVocabulary(data: Partial<VocabItem>) {
    const res = await api.post('/content/vocabulary', data);
    return res.data;
  },

  async getPrepositions(level?: string): Promise<Preposition[]> {
    const res = await api.get('/content/prepositions', { params: { level } });
    return res.data;
  },

  async getGrammar(level?: string): Promise<GrammarTopic[]> {
    const res = await api.get('/content/grammar', { params: { level } });
    return res.data;
  },

  async getGrammarTopic(id: number): Promise<GrammarTopic> {
    const res = await api.get(`/content/grammar/${id}`);
    return res.data;
  },

  async getGameVocabSet(params: { level?: string; category?: string; count?: number }): Promise<VocabItem[]> {
    const res = await api.get('/content/games/vocab-set', { params });
    return res.data;
  },

  async getLevels(): Promise<{ level: string; vocab_count: number }[]> {
    const res = await api.get('/content/levels');
    return res.data;
  },
};

export const materialsApi = {
  async getTree() {
    const res = await api.get('/materials/tree');
    return res.data;
  },

  async getAudioFiles(folderPath: string) {
    const res = await api.get('/materials/audio', { params: { folderPath } });
    return res.data;
  },

  async getStats() {
    const res = await api.get('/materials/stats');
    return res.data;
  },
};
