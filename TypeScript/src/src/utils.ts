import type {SegmentName} from './model'

export function clampToLength(state: SegmentName[][], length: number): SegmentName[][] {
  return state.concat(emptyDisplays(Math.max(0, length - state.length))).slice(0, length);
}
export function emptyDisplays(amount: number) {
  return Array.from({ length: amount }, () => []);
}

export function carryRight(fn: (...args: any[]) => void, arg: any): (...newArgs: any[]) => void {
  return (...newArgs: any[]) => fn(...newArgs, arg);
}

export function randomItem<T>(set: Set<T>): T {
  const i = Math.trunc(set.size * Math.random());
  return Array.from(set)[i];
}
