import {
  createContractService,
  checkContractIsExistService,
  closeContractService,
  getContractService,
  getContractByIdService,
  signContractService,
  createSmartContractService,
} from "../services/contract";

import { uploadFiletoIpfs } from "../services/uploadScIpfs";

export const handleInitContract = async (req, res, next) => {
  try {
    const user = req.user;
    if (user.id === req.body.sellerId) {
      return res
        .status(400)
        .json({ message: "Bạn không thể tạo phòng đàm phán với chính mình" });
    }
    const check = await checkContractIsExistService({
      userId: req.user.id,
      realEstateId: req.body.realEstateId,
    });

    if (check === true) {
      return res
        .status(400)
        .json({ message: "Bạn đang có hợp đồng của dự án này" });
    }

    const data = { ...req.body, renterId: user.id };
    const contract = await createContractService(data);
    return res.status(200).json({
      message: "Create contract successfully",
      data: contract,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Server error creating contract" });
  }
};

export const handleCloseContract = async (req, res) => {
  try {
    const user = req.user;
    await closeContractService(user.id, req.body.contractId);
    return res.status(200).json({ message: "Close contract successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Server error close contract" });
  }
};

export const handleGetContractForMe = async (req, res) => {
  try {
    const user = req.user;
    const data = await getContractService({ userId: user.id });
    return res
      .status(200)
      .json({ message: "Get contract success ", data: data });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Server error get contract" });
  }
};

export const handleGetContractById = async (req, res) => {
  try {
    const data = await getContractByIdService({ id: req.params.id });
    return res
      .status(200)
      .json({ message: "Get contract success ", data: data });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Server error get contract by id" });
  }
};

export const handleSignContract = async (req, res) => {
  try {
    const data = { ...req.body, userId: req.user.id };
    await signContractService(data);

    return res.status(200).json({ message: "Sign contract successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export const handleCreateSc = async (req, res) => {
  try {
    const contractId = req.body.contractId;
    const contractCid = req.body.cid;
    const userId = req.user.id;
    await createSmartContractService({
      contractId: contractId,
      contractCid: contractCid,
      userId: userId,
    });

    return res.status(200).json({ message: "Create smart contract" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export const handleUploadToIpfs = async (req, res) => {
  try {
    const file = req.body.file;
    const contractId = req.body.contractId;
    const { responses: fileUploadResponses } = await uploadFiletoIpfs(
      file,
      contractId
    );
    return res.status(200).json({
      message: "upload to Ipfs success",
      data: `${fileUploadResponses.IpfsHash}`,
    });
  } catch (err) {
    console.log(err);
    console.log("handle Upload to Ipfs fail");
    return res.status(400).json({ message: err.message });
  }
};
