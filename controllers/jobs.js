const Job = require("../models/job");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllJobs = async (req, res) => {
  res.send("Get All Jobs");
};

const getJob = async (req, res) => {
  res.send("Get Single Job");
};

const createJob = async (req, res) => {
  // Job oluşturacak kişinin id'sini istek bölümünden alıp createdBy değişkenimize aktarıyoruz.
  req.body.createdBy = req.user.userId;

  // istek body'si içerisinde gelen bilgiler ile job oluşturuyoruz ve job değişkenine atıyoruz.
  const job = await Job.create(req.body);

  // Sonrasında oluşan job' elemanını cevap olarak created status code'u ile gönderiyoruz.
  res.status(StatusCodes.CREATED).json({ job });
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
