export interface Quote {
  id: string;
  sanskrit: string;
  translations: {
    [key: string]: string;
  };
  chapter: number;
  verse: number;
  keywords: string[];
}

export interface Mood {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
}

export type TranslationLanguage = 'english' | 'hindi' | 'spanish' | 'german' | 'french';