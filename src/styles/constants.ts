import { stripUnit } from 'polished';

export const responsiveWidths = {
  xl: '1344px',
  lg: '1152px',
  md: '960px',
};

export const breakPoints = Object.entries(responsiveWidths).reduce((acc: any, [k, v]) => {
  acc[k] = `${stripUnit(v) as number + 64}px`;
  return acc;
}, {});
