import type { KeywordItem } from '@/api';

const LIKES_KEY = 'likes';

export const addItem = (item: KeywordItem) => {
  const prevItems = loadStorage();
  if (!prevItems.includes(item)) {
    prevItems.push(item);
    localStorage.setItem(LIKES_KEY, JSON.stringify(prevItems));
  }
};

export const removeItem = (item: KeywordItem) => {
  const prevItems = loadStorage();
  const updatedItems = prevItems.filter(
    (like) => like.contentid !== item.contentid,
  );
  localStorage.setItem(LIKES_KEY, JSON.stringify(updatedItems));
};

export const loadStorage = (): KeywordItem[] => {
  const likes = localStorage.getItem(LIKES_KEY);
  return likes ? JSON.parse(likes) : [];
};

export const clearStorage = () => {
  localStorage.removeItem(LIKES_KEY);
};

export const checkItem = (id: string) => {
  return loadStorage().some((item) => item.contentid === id);
};
