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

export const convertVndToEth = (value) => {
  return value * 12.5e3;
};

export const buildParamsCreateSc = (contract) => {
  const dlDate = new Date(contract.TimeStart?.value);

  const renterAddress = contract?.renter?.wallet;
  const sellerAddress = contract?.seller?.wallet;
  const reId = contract?.RealEstate?.id;
  const rentCost = convertVndToEth(contract?.Cost.value);

  const timeStart = dlDate.valueOf();
  const paymentDeadline = dlDate.getDate();
  const duration = dlDate.setFullYear(dlDate.getFullYear() + 1) - timeStart;
  const paymentType = "Etherum";

  const terms =
    contract?.Terms?.length > 0
      ? contract?.Terms.map((term) => {
          if (term.accept === "1") {
            return term.content;
          }
        })
      : [];

  return {
    id: contract?.id,
    renterAddress: renterAddress,
    sellerAddress: sellerAddress,
    reId: reId,
    rentCost: rentCost,
    duration: duration,
    timeStart: timeStart,
    paymentDeadline: paymentDeadline,
    paymentType: paymentType,
    terms: terms,
  };
};
