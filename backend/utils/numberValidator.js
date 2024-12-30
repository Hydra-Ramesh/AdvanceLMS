export const numberValidator = (number) => {
  const regex = /^\+91[789]\d{9}$/;
  return regex.test(number);
};
