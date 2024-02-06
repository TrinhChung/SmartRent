import {
  bulkCreateFloorsService,
  getFloorByIdService,
} from "../services/floor";
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
      var floors = [];

      for (var i in data.floors) {
        floorCount += 1;
        const floor = {
          name: "Tầng " + floorCount,
          realEstateId: data.realEstateId,
          status: data.floors[i]?.status,
          cost: data.floors[i]?.cost,
          description: data.floors[i]?.description,
          files: data.floors[i]?.files,
        };
        floors.push(floor);
      }
    }

    await bulkCreateFloorsService({ floors: floors });
    return res.status(200).json({ message: "Create floors successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export const handleGetFloorById = async (req, res, next) => {
  try {
    const floorId = req.params.id;

    const data = await getFloorByIdService(floorId);
    if (!data) {
      return res.status(404).json({ message: `Can't find by id ${floorId}` });
    }

    return res.status(200).json({ message: "Get floor success", data: data });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};
