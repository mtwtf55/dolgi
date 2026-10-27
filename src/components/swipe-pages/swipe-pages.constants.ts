export const SWIPE_DISTANCE_RATIO = 0.15;
export const SWIPE_VELOCITY = 300;
export const ELASTIC_WITH_NEIGHBOR = 0.9;
export const ELASTIC_WITHOUT_NEIGHBOR = 0.15;
export const SWIPE_SPRING = { type: 'spring', stiffness: 400, damping: 40 } as const;

export const IGNORE_SWIPE_SELECTOR =
  'input, textarea, select, [role="dialog"], [role="listbox"], [data-slot$="overlay"], [data-slot="calendar"]';

export const EMPTY_SWIPE_HANDOFF = { from: 0, leavingSide: null } as const;
