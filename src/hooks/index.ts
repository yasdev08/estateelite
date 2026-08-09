"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// ─── useScrollY ──────────────────────────────────────────────────────────────

export function useScrollY(): number {
  const [y, setY] = useState(0);
  useEffect(() => {
    const handler = () => setY(window.scrollY);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return y;
}

// ─── useScrollDirection ──────────────────────────────────────────────────────

export function useScrollDirection(): "up" | "down" {
  const [dir, setDir] = useState<"up" | "down">("up");
  const prev = useRef(0);
  useEffect(() => {
    const handler = () => {
      const curr = window.scrollY;
      setDir(curr > prev.current ? "down" : "up");
      prev.current = curr;
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return dir;
}

// ─── useDebounce ─────────────────────────────────────────────────────────────

export function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

// ─── useLocalStorage ─────────────────────────────────────────────────────────

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const [stored, setStored] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        const next = value instanceof Function ? value(stored) : value;
        setStored(next);
        window.localStorage.setItem(key, JSON.stringify(next));
      } catch (err) {
        console.error(`useLocalStorage error for key "${key}":`, err);
      }
    },
    [key, stored]
  );

  return [stored, setValue];
}

// ─── useFavorites ────────────────────────────────────────────────────────────

export function useFavorites() {
  const [favorites, setFavorites] = useLocalStorage<string[]>("ee-favorites", []);

  const toggle = useCallback(
    (id: string) => {
      setFavorites((prev) =>
        prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
      );
    },
    [setFavorites]
  );

  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites]);

  return { favorites, toggle, isFavorite };
}

// ─── useMediaQuery ───────────────────────────────────────────────────────────

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);
  return matches;
}

export const useIsMobile = () => useMediaQuery("(max-width: 768px)");
export const useIsTablet = () => useMediaQuery("(max-width: 1024px)");

// ─── useClickOutside ─────────────────────────────────────────────────────────

export function useClickOutside<T extends HTMLElement>(
  callback: () => void
): React.RefObject<T> {
  const ref = useRef<T>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [callback]);
  return ref;
}

// ─── useKeyPress ─────────────────────────────────────────────────────────────

export function useKeyPress(key: string, callback: () => void) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === key) callback();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [key, callback]);
}

// ─── useCopyToClipboard ──────────────────────────────────────────────────────

export function useCopyToClipboard(timeout = 2000) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), timeout);
    } catch {
      console.error("Failed to copy to clipboard");
    }
  }, [timeout]);

  return { copied, copy };
}
