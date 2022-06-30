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
  // istekten gelen params id'sini ve şuan giriş yapmış user'ın bilgilerini alıyoruz.
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  // Sonrasında Job koleksiyonumuzun içerisinde gelen id'ye ve createdBy id'sine sahip job objesini buluyoruz.
  const job = await Job.findOne({
    _id: jobId,
    createdBy: userId,
  });

  // Eğer yoksa hata gönderiyoruz
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }

  // Var ise cevap olarak dönüyoruz.
  res.status(StatusCodes.OK).json({ job });
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
  // istekten gelen bilgileri alıyoruz
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId },
  } = req;

  // aldığımız bilgiler arasında company veya position boş ise hata gönderiyoruz
  if (company === "" || position === "") {
    throw new BadRequestError("Company or Position fields cannot be empty");
  }

  // Sonrasında istekten gelen id ve userId'sine sahip objeyi bulduktan sonra istek body içerisindeki bilgiler ile güncelliyoruz.
  const job = await Job.findByIdAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );

  // Eğer obje bulunmaz ise hata gönderiyoruz.
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }

  // Var ise güncellenmiş objeyi cevap olarak dönüyoruz.
  res.status(StatusCodes.OK).json({ job });
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
