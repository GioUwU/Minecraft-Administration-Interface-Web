const { Router } = require("express");
const { Users } = require("../db.js");
const path = require("path");
const router = Router();
const {
  Login,
  Logout,
  Register,
  getDataUser,
  getAllUsers,
  deleteUser,
} = require("../controllers/auth.js");
const { registerSancion, uploadProofs } = require("../controllers/register.js");
const {
  getAllHistory,
  getUserNameHistory,
  getHistoryByFaction,
  getHistoryBiId,
  deleteHistory,
  getProofs,
  getProofsByNameFile,
} = require("../controllers/getHistory.js");
const {
  getAllTimes,
  getAllRules,
  newRule,
  newTime,
  authoRizeSanction,
  updateAvatar,
  getAvatar
} = require("../controllers/general.js");

// rutas usuarios
router.post("/api/login", Login);
router.post("/api/logout", Logout);
router.post("/api/register", Register);
router.get("/api/user", getDataUser);
router.get("/api/getAllUsers", getAllUsers);
router.delete("/api/deleteUser", deleteUser);

// rutas general
router.get("/api/getAllTimes", getAllTimes);
router.get("/api/getAllRules", getAllRules);
router.post("/api/newRule", newRule);
router.post("/api/newTime", newTime);

// rutas historial
router.post("/api/registerSancion", registerSancion);
router.get("/api/getAllHistory", getAllHistory);
router.get("/api/getUserNameHistory/:nickname", getUserNameHistory);
router.get("/api/getHistoryByFaction/:faction", getHistoryByFaction);
router.get("/api/getHistoryBiId/:id", getHistoryBiId);
router.delete("/api/deleteHistory/:id", deleteHistory);
router.post("/api/uploadProofs/:id", uploadProofs);
router.get("/api/proofs/:id", getProofs);
router.get("/proofs/:name", getProofsByNameFile);

//authoRizeSanction
router.post("/api/authoRizeSanction/:id", authoRizeSanction);
router.post("/api/updateAvatar/:id", updateAvatar);

// rutas upload
router.get("/avatar/:id", getAvatar);

module.exports = router;
