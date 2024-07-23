import { blink, marquee, mix, typing } from './effects';
import { SegmentName, segmentNames } from './model';
import { carryRight } from './utils';

export function isElement(element: Node): element is HTMLElement {
  return element.nodeType === 1;
}

export function isTemplateNode(element: Node): element is HTMLTemplateElement {
  return isElement(element) && element.nodeName === 'TEMPLATE';
}

export function imageCreator(templateId: string): (() => Node) | null {
  const templateElement = document.getElementById(templateId);
  if (!templateElement)
    return null;
  if (!isTemplateNode(templateElement))
    return null;
  const clone = () => templateElement.content.cloneNode(true);
  return clone;
}

export function checkNonNullable<T>(value: T): asserts value is NonNullable<T> {
  if (value === null) {
    throw new Error('value is null');
  }
}

export function makeDisplays(amount: number, parentElement: Element, domOptions: {className: string, templateId: string}): Element[] {
  const displays = [...parentElement.querySelectorAll(`.${domOptions.className}`)];
  for (let i = displays.length - 1; i >= amount; i -= 1) {
    displays[i].remove();
    displays.pop();
  }
  const getImage = imageCreator(domOptions.templateId);
  while (getImage && displays.length < amount) {
    const display = getImage();
    parentElement.append(display);
    const last = parentElement.lastChild;
    if (last && isElement(last))
      displays.push(last);
  }
  return displays;
}

export function updateDisplay(segments: SegmentName[], display: Element): void {
  for (const segmentName of segmentNames) {
    display.classList.remove(segmentName);
  }
  for (const segmentName of segments) {
    display.classList.add(segmentName);
  }
}

export function updateDisplayBlock(segments: SegmentName[][], parentElement: Element, domOptions: {className: string, templateId: string}): void {
  const displays = makeDisplays(segments.length, parentElement, domOptions);
  segments.forEach((segment, i: number) => {
    updateDisplay(segment, displays[i]);
  });
}

function startAnimationBuilder(frameBuffers: Map<Element, SegmentName[][][]>): (frames: SegmentName[][][], parent: Element) => void {
  return function start(frames: SegmentName[][][], parent: Element): void {
    frameBuffers.set(parent, [...frames].reverse());
  };
}

export function initAnimation(domOptions: {className: string, templateId: string}) {
  const frameDelay = 100;
  const frameBuffers = new Map<Element, SegmentName[][][]>();

  function animateFrame() {
    for (const [parent, frameBuffer] of frameBuffers) {
      if (frameBuffer.length) {
        const block = frameBuffer.pop();
        if (!block)
          return;
        updateDisplayBlock(block, parent, domOptions);
      }
      else {
        frameBuffers.delete(parent);
      }
    }
  }
  setInterval(animateFrame, frameDelay);
  return startAnimationBuilder(frameBuffers);
}

export function animateTyping(text: string, element: HTMLElement, start: (frames: SegmentName[][][], parent: Element) => void): void {
  const frames  = typing(text, { convertToUpperCase: true });
  start(frames, element);
}

export function animateBlink(text: string, element: HTMLElement, start: (frames: SegmentName[][][], parent: Element) => void): void {
  const frames = blink(text, 12);
  start(frames, element);
}

export function animateMarquee(text: string, element: HTMLElement, start: (frames: SegmentName[][][], parent: Element) => void): void {
  const frames = marquee(text);
  start(frames, element);
}

export function animateMix(text: string, element: HTMLElement, start: (frames: SegmentName[][][], parent: Element) => void): void {
  const frames = mix(text);
  start(frames, element);
}

export function getDefaultAnimations(start: (frames: SegmentName[][][], parent: Element) => void): Record<string, (element: Element, text: string) => void> {
  return {
    typing: carryRight(animateTyping, start),
    blink: carryRight(animateBlink, start),
    marquee: carryRight(animateMarquee, start),
    mix: carryRight(animateMix, start),
  };
}

export function getDefaultAnimationsWrappers(animations: Record<string, (element: Element, text: string) => void>, target: HTMLElement | null, input: HTMLInputElement) {
  return {
    typing: () => carryRight(animations.typing, target)(input.value),
    blink: () => carryRight(animations.blink, target)(input.value),
    marquee: () => carryRight(animations.marquee, target)(input.value),
    mix: () => carryRight(animations.mix, target)(input.value),
  };
}

