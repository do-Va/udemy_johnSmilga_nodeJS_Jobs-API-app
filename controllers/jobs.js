const getAllJobs = async (req, res) => {
  res.send("getAllJobs user");
};

const getJob = async (req, res) => {
  res.send("getJob user");
};

const createJob = async (req, res) => {
  res.send("createJob user");
};

const updateJob = async (req, res) => {
  res.send("updateJob user");
};

const deleteJob = async (req, res) => {
  res.send("deleteJob user");
};

module.exports = {
  getAllJobs,
  createJob,
  deleteJob,
  getJob,
  updateJob,
};
