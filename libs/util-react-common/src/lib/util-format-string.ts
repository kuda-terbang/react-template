export const capitalize = (string: string) => {
  const arrString = string.split(' ');
  const result = arrString.map((str) => str.charAt(0).toUpperCase() + str.slice(1));
  return result.join(' ');
};
