import { SegmentName, segmentNames } from './model';
import { clampToLength } from './utils';
export type Options1 = {dense: boolean};


type AnimateDisplayFunction = (
  startDisplayState: SegmentName[],
  targetDisplayState: SegmentName[],
  options: Options1 | undefined
) => SegmentName[][];

export function transition(from: SegmentName[][], to: SegmentName[][], animateDisplay: AnimateDisplayFunction, animateDisplayOptions: Options1): SegmentName[][][] {
  from = clampToLength(from, to.length);
  const displayFrames = from.map((startDisplayState, i: number) => {
    return animateDisplay(startDisplayState, to[i], animateDisplayOptions);
  });
  const maxFrames : number = Math.max(...displayFrames.map(f => f.length));
  const frames = [];
  for (let i : number = 0; i < maxFrames; i += 1) {
    frames.push(displayFrames.map(frames => frames[i] || frames.at(-1)));
  }
  return frames;
}
export function segmentBySegment(from: SegmentName[], to: SegmentName[], options: Options1) {
  const curState = new Set<string>(from);
  const toState = new Set<string>(to);
  const res = [[...curState]];
  for (const segmentName of segmentNames) {
    const changed = toState.has(segmentName) !== curState.has(segmentName);
    if (!changed && options?.dense) {
      continue;
    }
    if (toState.has(segmentName)) {
      curState.add(segmentName);
    }
    else {
      curState.delete(segmentName);
    }
    res.push([...curState]);
  }
  return res;
}
const layers = [
  ['a', 'b', 'c', 'd', 'e', 'f'],
  ['h', 'j', 'k', 'm'],
  ['i', 'l', 'g1', 'g2'],
] as const;
export function layerByLayer(from: SegmentName[], to: SegmentName[]) {
  const curState = new Set<SegmentName>(from);
  const toState = new Set<SegmentName>(to);
  const res = [[...curState]];
  for (const layer of layers) {
    for (const segment of layer) {
      curState.add(segment);
    }
    res.push([...curState]);
  }
  for (let i = layers.length - 1; i >= 0; i -= 1) {
    for (const segment of layers[i]) {
      if (!toState.has(segment)) {
        curState.delete(segment);
      }
    }
    res.push([...curState]);
  }
  return res;
}
