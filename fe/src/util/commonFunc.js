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
  const timeStartData = contract?.Terms.find(
    (term) => term?.type === "timeStart"
  );
  const costData = contract?.Terms.find((term) => term?.type === "cost");
  const dlDate = new Date(timeStartData.value);

  const renterAddress = contract?.renter?.wallet;
  const sellerAddress = contract?.seller?.wallet;
  const reId = contract?.RealEstate?.id;
  const rentCost = convertVndToEth(costData.value);

  const timeStart = dlDate.valueOf();
  const duration = dlDate.setFullYear(dlDate.getFullYear() + 1) - timeStart;

  return {
    id: contract?.id,
    renterAddress: renterAddress,
    sellerAddress: sellerAddress,
    reId: reId,
    rentCost: rentCost,
    duration: duration,
  };
};
