const express = require("express");
const router = express.Router();

const {
  getAllJobs,
  getJob,
  createJob,
  deleteJob,
  updateJob,
} = require("../controllers/jobs");

router.get("/").post(createJob).get(getAllJobs);
router.get("/:id").get(getJob).delete(deleteJob).patch(updateJob);

module.exports = router;
