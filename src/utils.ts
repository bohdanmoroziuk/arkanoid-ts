export const isMovingLeft = (event: KeyboardEvent) => {
  return [event.code, event.key].includes('ArrowLeft');
};

export const isMovingRight = (event: KeyboardEvent) => {
  return [event.code, event.key].includes('ArrowRight');
};
