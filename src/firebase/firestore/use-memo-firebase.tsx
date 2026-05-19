import { useMemo } from 'react';

export function useMemoFirebase<T>(
  factory: () => T,
  deps: React.DependencyList
): T {
  return useMemo(factory, deps);
}
