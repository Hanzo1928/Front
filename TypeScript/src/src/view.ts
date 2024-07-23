import { segmentCodes } from './model';
import type { SegmentName } from './model';

type Options = {convertToUpperCase: boolean, unknownChar?: SegmentName[] | 'exception'};


export function isKnownChar(char: string): char is SegmentName {
  return char in segmentCodes;
}
export function charToDisplay(char: string, options: Options): SegmentName[] {
  if (options?.convertToUpperCase) {
    char = char.toUpperCase();
  }
  if (!isKnownChar(char)) {
    if (options?.unknownChar === 'exception') {
      throw new Error(`Cannot convert character ${char} to 14-segment display`);
    }
    return options?.unknownChar ?? [];
  }
  return segmentCodes[char];
}
export function stringToDisplay(input: string, options: Options): SegmentName[][] {
  return [...input].map(c => charToDisplay(c, options));
}

export function stringToDisplayArea(input: string, options: Options): SegmentName[][][] {
  return input.split('\n').map(line => stringToDisplay(line, options));
}
