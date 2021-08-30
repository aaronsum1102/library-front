const formatDate = (date: Date, locale: string): string => {
  return date.toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' });
};

export default formatDate;
