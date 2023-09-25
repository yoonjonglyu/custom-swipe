export const checkMobile = () => {
  return /iPhone|iPad|Android/g.test(navigator.userAgent);
};
