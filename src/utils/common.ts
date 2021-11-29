export const convertMinsToHrsMins = (mins: number): string => {
  const h = Math.floor(mins / 60);
  const m = mins % 60;

  String(h).padStart(2, '0');
  String(m).padStart(2, '0');

  return `${h}h ${m}m`;
};

