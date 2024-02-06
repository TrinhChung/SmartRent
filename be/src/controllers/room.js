import { getFloorByIdService } from "../services/floor";
import { bulkCreateRoomsService, getRoomByIdService } from "../services/room";
export const handleBulkCreateRooms = async (req, res, next) => {
  try {
    const data = req.body;
    data.floorId = Number(data.floorId);
    const floor = await getFloorByIdService(data.floorId);

    if (!floor) {
      return res
        .status(404)
        .json({ message: `Can't find floor by id ${data.floorId}` });
    } else {
      var roomCount = floor.Rooms.length;
      var rooms = [];

      for (var room of data.rooms) {
        roomCount += 1;

        const input = {
          name: room?.name,
          floorId: data.floorId,
          status: room?.status,
          cost: room?.cost,
          description: room?.description,
          files: room?.files,
          acreage: room?.acreage,
          type: room?.type,
        };

        rooms.push(input);
      }
    }

    await bulkCreateRoomsService({ rooms: rooms });
    return res.status(200).json({ message: "Create rooms successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export const handleGetRoomById = async (req, res, next) => {
  try {
    const roomId = req.params.id;

    const data = await getRoomByIdService(roomId);
    if (!data) {
      return res.status(404).json({ message: `Can't find by id ${roomId}` });
    }

    return res.status(200).json({ message: "Get room success", data: data });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};
