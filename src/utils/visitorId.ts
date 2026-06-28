const STORAGE_KEY = 'aib_visitor_id';

function generateId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // fallback for older environments
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}

export function getVisitorId(): string {
  if (typeof window === 'undefined') return '';

  try {
    let id = localStorage.getItem(STORAGE_KEY);
    if (!id) {
      id = generateId();
      localStorage.setItem(STORAGE_KEY, id);
    }
    return id;
  } catch {
    // localStorage blocked (private mode, storage full, etc.) — fall back to session
    try {
      let id = sessionStorage.getItem(STORAGE_KEY);
      if (!id) {
        id = generateId();
        sessionStorage.setItem(STORAGE_KEY, id);
      }
      return id;
    } catch {
      return generateId();
    }
  }
}
