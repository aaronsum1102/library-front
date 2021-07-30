// eslint-disable-next-line import/prefer-default-export
export const validateEmail = (value: string): boolean => {
  return new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i).test(value);
};
