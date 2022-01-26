export const stringToDate = (text: string): Date => {
  const splitted = text.split('/');
  const transformed = [splitted[1], splitted[0], splitted[2]].join('/');
  return new Date(transformed);
};
