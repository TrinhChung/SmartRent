export const checkListTermAccept = (terms) => {
  if (!terms || terms.length === 0) return true;

  for (var term in terms) {
    console.log(term);
    if (terms[term].accept === "0") {
      return false;
    }
  }
  return true;
};

export const convertBlobToBase64Async = (blob, mimeType) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrlPrefix = `data:${mimeType};base64,`;
      const base64WithDataUrlPrefix = reader.result;
      const base64 = base64WithDataUrlPrefix.replace(dataUrlPrefix, "");
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};
