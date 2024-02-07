import db from "../models/index";
import { createFileService } from "./file";

export const bulkCreateFloorsService = async ({ floors }) => {
  const transaction = await db.sequelize.transaction();
  try {
    for (var data of floors) {
      var floor = await db.Floor.create(
        {
          name: data.name,
          realEstateId: data?.realEstateId,
          status: data?.status,
          cost: data?.cost,
          description: data?.description,
        },
        { transaction: transaction }
      );

      if (data.files.length > 0) {
        floor = floor.get({ plain: true });
        await createFileService(
          {
            fkId: floor.id,
            files: data.files,
          },
          "3",
          transaction
        );
      }
    }

    const realEstate = await db.RealEstate.findOne({
      where: { id: floors[0].realEstateId },
    });

    await realEstate.update(
      {
        floorTotal: realEstate.floorTotal + floors.length,
      },
      { transaction: transaction }
    );

    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    console.log(error.status);
    throw new Error(error.message, error);
  }
};

export const getFloorByIdService = async (id) => {
  try {
    const floor = await db.Floor.findOne({
      where: { id: id },
      include: [
        {
          model: db.File,
          where: {
            typeFk: "3",
          },
          attributes: ["url"],
        },
        {
          model: db.RealEstate,
          include: [{ model: db.Address }],
        },
        {
          model: db.Room,
          include: [
            {
              model: db.File,
              where: {
                typeFk: "4",
              },
              attributes: ["url"],
            },
          ],
        },
      ],
    });
    if (!floor) {
      return null;
    }
    return floor.get({ plain: true });
  } catch (error) {
    console.log(error.status);
    throw new Error(error.message, error);
  }
};
