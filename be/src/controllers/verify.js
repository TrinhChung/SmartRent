import db from "../models/index";
export const verifyAccountController = async (req, res, next) => {
  try {
    const token = req.params.token;
    let verify = (verify = await db.Verify.findOne({
      where: { token: token },
    }));

    if (verify) {
      let user = await db.User.findByPk(verify.fkId);
      if (user) {
        await user.update({ isActive: true });
        await db.Verify.destroy({ where: { id: verify.id } });
      }
      return res.status(200).json("Success");
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send("Error");
  }
};
