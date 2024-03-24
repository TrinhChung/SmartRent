import db from "../models/index";
const { Op } = require("sequelize");

export const getUserPaymentDeadline = async (data) => {
    try {
        const contractHasDeadline = await db.Contract.findAll({
            include: [
                {
                  model: db.Term,
                  where: {
                    type: "deadline",
                    value: {[Op.substring]: data}
                  },
                  attributes: ['type'],
                },
                {
                    model: db.User,
                    as: "renter",
                    attributes: ['email','id'],
                }
            ],
            attributes:['realEstateId','id'],
        })
        return contractHasDeadline;
    } catch (error) {
        console.log(`Get user paymet deadline: ${error}`)   
    }
}