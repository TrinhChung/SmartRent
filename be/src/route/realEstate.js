import { Router } from "express";
import {
  handleCreateRealEstate,
  handleGetAllRealEstate,
  handleGetRealEstate,
  handleGetRealEstateByRecommend,
  handleGetRealEstateByUserId,
  handleSearchRealEstate,
} from "../controllers/realEstate";
import {
  createRealEstateSchema,
  getRealEstateFullHouseSchema,
} from "../schema/realEstate";
import {
  authenticate,
  getUser,
  checkRoleSeller,
} from "../middleware/authenticate";
const SchemaValidator = require("nodejs-schema-validator");
const schemaValidatorInstance = new SchemaValidator();

export const router = Router();

// TODO: only allow seller create
router.post(
  "/full-house",
  authenticate,
  checkRoleSeller,
  schemaValidatorInstance.validateBody(createRealEstateSchema),
  handleCreateRealEstate
);

router.get(
  "/full-house/:id",
  getUser,
  schemaValidatorInstance.validateParams(getRealEstateFullHouseSchema),
  handleGetRealEstate
);

router.get(
  "/posted-by-me",
  authenticate,
  checkRoleSeller,
  handleGetRealEstateByUserId
);

router.post("/search", handleSearchRealEstate);

router.post("/recommend", getUser, handleGetRealEstateByRecommend);

router.get("/all", handleGetAllRealEstate);
