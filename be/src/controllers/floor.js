import { getRealEstateFullHouseService } from "../services/realEstate";

export const handleBulkCreateFloors = async (req, res, next) => {
  try {
    const data = req.body;
    data.realEstateId = Number(data.realEstateId);
    const realEstate = await getRealEstateFullHouseService(data.realEstateId);

    if (!realEstate) {
      return res
        .status(404)
        .json({ message: `Can't find house by id ${data.realEstateId}` });
    } else {
      var floorCount = realEstate.Floors.length;
      for (var floor of data.floors) {
        floorCount += 1;
        floor.name = "Tầng " + floorCount;
      }
    }
    console.log(data);
    return res.status(200).json({ message: "Create floors successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};
