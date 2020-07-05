const puppeteer = require('puppeteer');
const $ = require('cheerio');
const url = 'http://covid.gov.pk/';

const removeCommas = str => str.replace(/,/g, '')

puppeteer
  .launch()
  .then(browser => browser.newPage())
  .then(page => page.goto(url)
    .then(() => page.content()))
  .then(html => {
    const Tests = +removeCommas($('.text-muted', html).last().text());
    const Confirmed = +removeCommas($('.numanimate', '.hd-box-main', html).data().value);
    const Recovered = +removeCommas($('h3', '.revovered', html).text());
    const Deaths = +removeCommas($('h3', '.deaths', html).text());
    const Active = Confirmed - Recovered - Deaths;
    const result = { Tests, Confirmed, Active, Recovered, Deaths, Date: new Date(Date.now() - 86400000) };
    console.log(result)
  })
  .catch(err => {
    console.log(err);
  });