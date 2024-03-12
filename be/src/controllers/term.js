import {
  createTermService,
  updateAcceptCostTermService,
  updateAcceptTimeStartTermService,
  updateTermService,
  updateValueCostTermService,
  updateValueTimeStartTermService,
} from "../services/term";

const checkContradiction = async (data) => {
  return true;
};

export const handleCreateTerm = async (req, res, next) => {
  try {
    const data = { ...req.body, userId: req.user.id };
    console.log(data);

    if (!checkContradiction(data)) {
      return res.status(400).json({ message: "Các điều khoản bị xung đột" });
    }
    await createTermService(data);
    return res.status(200).json({ message: "Create term successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export const handleUpdateTerm = async (req, res, next) => {
  try {
    const data = { ...req.body, userId: req.user.id };

    await updateTermService(data);
    return res.status(200).json({ message: "Update term successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export const handleUpdateAcceptTerm = async (req, res, next) => {
  try {
    const data = { ...req.body, userId: req.user.id };

    await updateAcceptCostTermService(data);
    return res.status(200).json({ message: "Update accept term successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export const handleUpdateValueCostTerm = async (req, res, next) => {
  try {
    const data = { ...req.body, userId: req.user.id };

    await updateValueCostTermService(data);
    return res
      .status(200)
      .json({ message: "Update value cost term successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export const handleUpdateAcceptTimeStartTerm = async (req, res, next) => {
  try {
    const data = { ...req.body, userId: req.user.id };

    await updateAcceptTimeStartTermService(data);
    return res
      .status(200)
      .json({ message: "Update accept time start term successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export const handleUpdateValueTimeStartTerm = async (req, res, next) => {
  try {
    const data = { ...req.body, userId: req.user.id };

    await updateValueTimeStartTermService(data);
    return res
      .status(200)
      .json({ message: "Update value time start term successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};
