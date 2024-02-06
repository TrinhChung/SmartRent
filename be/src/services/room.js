import db from "../models/index";
import { createFileService } from "./file";

export const bulkCreateRoomsService = async ({ rooms }) => {
  const transaction = await db.sequelize.transaction();
  try {
    for (var data of rooms) {
      var room = await db.Room.create(
        {
          name: data.name,
          floorId: data?.floorId,
          status: data?.status,
          cost: data?.cost,
          description: data?.description,
          acreage: data?.acreage,
          type: data?.type,
        },
        { transaction: transaction }
      );

      if (data.files.length > 0) {
        room = room.get({ plain: true });
        await createFileService(
          {
            fkId: room.id,
            files: data.files,
          },
          "4",
          transaction
        );
      }
    }

    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    console.log(error.status);
    throw new Error(error.message, error);
  }
};

export const getRoomByIdService = async (id) => {
  try {
    const room = await db.Room.findOne({
      where: { id: id },
      include: [
        {
          model: db.File,
          where: {
            typeFk: "4",
          },
          attributes: ["url"],
        },
        {
          model: db.Floor,
          include: [{ model: db.RealEstate, include: [{ model: db.Address }] }],
        },
      ],
    });
    if (!room) {
      return null;
    }
    return room.get({ plain: true });
  } catch (error) {
    console.log(error.status);
    throw new Error(error.message, error);
  }
};
