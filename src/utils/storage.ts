import type { KeywordItem } from '@/api';

export const addItem = (item: KeywordItem, type: string) => {
  const prevItems = loadStorage(type);
  if (!prevItems.includes(item)) {
    prevItems.push(item);
    localStorage.setItem(type, JSON.stringify(prevItems));
  }
};

export const removeItem = (item: KeywordItem, type: string) => {
  const prevItems = loadStorage(type);
  const updatedItems = prevItems.filter(
    (like) => like.contentid !== item.contentid,
  );
  localStorage.setItem(type, JSON.stringify(updatedItems));
};

export const loadStorage = (type: string): KeywordItem[] => {
  const likes = localStorage.getItem(type);
  return likes ? JSON.parse(likes) : [];
};

export const clearStorage = (type: string) => {
  localStorage.removeItem(type);
};

export const checkItem = (id: string, type: string) => {
  return loadStorage(type).some((item) => item.contentid === id);
};
