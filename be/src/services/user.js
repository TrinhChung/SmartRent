import db from "../models/index";
import { createAddressService } from "./address";
import { createFileService } from "./file";
import bcrypt from "bcryptjs";
import { createVerify } from "./verify";

export const updateInfoUserService = async (data) => {
  const transaction = await db.sequelize.transaction();
  try {
    var address = null;
    if (!data?.addressId) {
      address = await createAddressService({
        address: {
          ...data.location,
          address: data.address,
        },
        transaction: transaction,
      });
    } else if (
      data.location?.lat &&
      data.location?.lng &&
      data?.oldLat !== data?.location?.lat &&
      data?.oldLng !== data?.location?.lng
    ) {
      address = await db.Address.findOne({ where: { id: data.addressId } });
      await address.update(
        {
          lat: data.location.lat,
          lng: data.location.lng,
          address: data.address,
        },
        { transaction: transaction }
      );
    }

    var user = await db.User.findOne({ where: { id: data.userId } });
    await user.update(
      {
        firstName: data.firstName,
        lastName: data.lastName,
        birthday: data?.birthday,
        gender: data?.gender,
        maritalStatus: data?.maritalStatus,
        phoneNumber: data?.phoneNumber,
        addressId: address?.id,
        wallet: data.wallet,
      },
      { transaction: transaction }
    );

    if (data.avatar) {
      await createFileService(
        {
          fkId: data.userId,
          files: [data.avatar],
        },
        "5",
        transaction
      );
    }

    await transaction.commit();

    const userRes = await db.User.findOne({
      where: { id: data.userId },
      include: [
        {
          model: db.File,
          where: {
            typeFk: "5",
          },
          required: false,
          attributes: ["url"],
        },
        { model: db.Address, required: false },
      ],
      attributes: { exclude: ["password"] },
    });

    return userRes.get({ plain: true });
  } catch (error) {
    console.log(error);
    await transaction.rollback();
    throw new Error(error);
  }
};

export const changePasswordService = async (data) => {
  try {
    const user = await db.User.findOne({ where: { id: data.userId } });
    const password = user.dataValues.password;
    let check = bcrypt.compareSync(data.oldPassword, password);
    if (check === true) {
      user.update({ password: data.password });
    } else {
      throw new Error("Mật khẩu không chính xác");
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const sendEmailForgotPasswordService = async ({ email }) => {
  try {
    const user = await db.User.findOne({
      where: { email: email },
      attributes: { exclude: ["password"] },
    });

    if (user) {
      await createVerify({ type: "2", data: { ...user.get({ plain: true }) } });
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const resetPasswordService = async ({ token, password }) => {
  const transaction = await db.sequelize.transaction();
  try {
    let verify = (verify = await db.Verify.findOne({
      where: { token: token, type: "2" },
    }));

    if (verify) {
      let user = await db.User.findByPk(verify.fkId);
      if (user) {
        await user.update({ password: password });
        await db.Verify.destroy({ where: { id: verify.id } });
      }
    }
    await transaction.commit();
  } catch (error) {
    console.log(error);
    await transaction.rollback();
    throw new Error(error);
  }
};
