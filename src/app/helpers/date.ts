export const addDays = (date: string, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);

  return result;
};

export const formatDate = (date: Date, locale: string): string => {
  return date.toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' });
};
