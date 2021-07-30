const isEqual = (a: Record<string, unknown>, b: Record<string, unknown>): boolean => {
  const propsA = Object.keys(a);
  const propsB = Object.keys(b);

  if (propsA.length !== propsB.length) {
    return false;
  }

  return !propsA.some((key) => a[key] !== b[key]);
};

export default isEqual;
