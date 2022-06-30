const Job = require("../models/job");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllJobs = async (req, res) => {
  // Middlewareden kullanıcı doğrulamasından sonra gelen userId sine göre filtreleme yapıyoruz ve sonrasında gelen bilgileri büyükten küçüğe doğru sıralayıp jobs objesine atıyoruz.
  const jobs = await Job.find({ createdBy: req.user.userId }).sort("createdAt");

  // cevap olarak da jobs objesini ve jobs objesinin boyutunu json formatında gönderiyoruz.
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
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
