export const emailValidator = (email) => {
  const emailRegex = /^[^\s@]+@(pwioi\.com|pwioi\.live)$/;
  return emailRegex.test(email);
};
