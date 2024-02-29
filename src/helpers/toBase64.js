export const toBase64 = (files) => {
  const promises = files.map(
    (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
      })
  );
  return Promise.all(promises);
};
