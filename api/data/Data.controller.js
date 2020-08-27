const puppeteer = require('puppeteer');
const $ = require('cheerio');
const axios = require('axios');
const url = require('../../config/apiEndpoint').url;
const dataRepository = require("./Data.repository");

const removeCommas = str => str.replace(/,/g, '');

const copyDataFromOtherAPI = async (req, res) => {
  try {
    const data = (await axios.get('https://api.covid19api.com/total/country/pakistan')).data;
    dataRepository.storeBulkData(data.slice(32), res);
  } catch (error) {
    console.log(error)
    res.send({ success: false, error });
  }
}

const scrapData = (req, res) => {
  puppeteer
    .launch()
    .then(browser => browser.newPage())
    .then(page => page.goto(url)
      .then(() => page.content()))
    .then(async html => {
      const Tests = +removeCommas($('.text-muted', html).last().text());
      const Confirmed = +removeCommas($('.numanimate', '.hd-box-main', html).data().value);
      const Recovered = +removeCommas($('h3', '.revovered', html).text());
      const Deaths = +removeCommas($('h3', '.deaths', html).text());
      const Active = Confirmed - Recovered - Deaths;
      const data = { Tests, Confirmed, Active, Recovered, Deaths, Date: new Date(Date.now() - 86400000) };
      try {
        await dataRepository.storeData(data);
        res.json({ success: true, data });
      } catch (error) {
        console.log(error);
        res.send({ success: false, error });
      }
    })
    .catch(error => {
      console.log(error);
      res.send({ success: false, error });
    });
};

const getDataById = async (req, res) => {
  const { _id } = req.params;
  try {
    const data = await dataRepository.getDataById(_id);
    res.send({ success: true, data });
  } catch (error) {
    console.log(error);
    res.send({ success: false, error });
  }
};
const getData = async (req, res) => {
  const { days } = req.query;
  let data = [];
  if (days) {
    data = await dataRepository.getDataOfDays(+days)
  } else {
    data = await dataRepository.getData();
  }
  res.send(data);
};

const deleteData = async (req, res) => {
  const { _id } = req.params;
  try {
    await dataRepository.deleteDataById(_id);
    res.send({ success: true });
  } catch (error) {
    console.log(error);
    res.send({ success: false, error });
  }
}

const updateData = async (req, res) => {
  const { _id } = req.params;
  try {
    const data = await dataRepository.getDataById(_id);
    await dataRepository.updateDataById(_id, +req.body.Tests);
    res.send({ success: true });
  } catch (error) {
    console.log(error);
    res.send({ success: false, error });
  }
}

module.exports = {
  scrapData,
  getData,
  getDataById,
  copyDataFromOtherAPI,
  deleteData,
  updateData
};
