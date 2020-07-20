const Data = require("./Data.model");

const getData = async () => {
  let allData = await Data.find();
  if (!allData) allData = [];
  return allData;
};

const getDataOfDays = async days => {
  const milisecondsInOneDay = 86400000;
  const dataFromDate = new Date((new Date().getTime() - ((days + 2) * milisecondsInOneDay)));

  let allData = await Data.find({
    "Date": { $gte: dataFromDate }
  });
  if (!allData) allData = [];
  return allData;
};

const storeData = async payload => {
  const data = new Data(payload);
  return await data.save();
};

const storeBulkData = (payload, res) => {
  Data.collection.insert(payload, (error, docs) => {
    if (error) {
      res.json({ success: false, error });
    }
    res.json({ success: true, docs });
  })
};

const deleteDataById = async _id => {
  return Data.findByIdAndRemove(_id);
}

module.exports = {
  getData,
  getDataOfDays,
  storeBulkData,
  storeData,
  deleteDataById
};
