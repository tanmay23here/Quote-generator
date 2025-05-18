import { Mood } from '../types/types';

export const defaultMoods: Mood[] = [
  {
    id: 'peaceful',
    name: 'Peaceful',
    description: 'Seeking inner peace and tranquility',
    isActive: true
  },
  {
    id: 'stressed',
    name: 'Stressed',
    description: 'Feeling overwhelmed or anxious',
    isActive: true
  },
  {
    id: 'guidance',
    name: 'Seeking Guidance',
    description: 'Looking for direction in life',
    isActive: true
  },
  {
    id: 'motivation',
    name: 'Seeking Motivation',
    description: 'Need inspiration to overcome challenges',
    isActive: true
  },
  {
    id: 'purpose',
    name: 'Questioning Purpose',
    description: "Reflecting on life's meaning",
    isActive: true
  },
  {
    id: 'knowledge',
    name: 'Seeking Knowledge',
    description: 'Thirst for wisdom and understanding',
    isActive: true
  }
];