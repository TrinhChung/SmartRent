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
