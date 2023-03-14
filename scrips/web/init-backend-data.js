const BACKEND_ENV = {
  endpoint: process.env.END_POINT ?? "https://pcms.ggg.systems/rest/V1/chiaki/dispatch",
  user_id: "default",
  store_id: "default"
};

//requiring path and fs modules
const path = require("path");
const fs = require("fs");
const axios = require("axios");
const _ = require("lodash");
const { Agent } = require("https");

//joining path of directory
const uiPagePath = path.resolve(__dirname, "..", "web", "ui");
const configPath = path.resolve(__dirname, "..", "web", "config");

function syncUiPage() {
  //passsing directoryPath and callback function
  fs.readdir(uiPagePath, function(err, files) {
    //handling error
    if (err) {
      return console.log("Unable to scan directory: " + err);
    }
    //listing all files using forEach
    files.forEach(function(file) {
      // Do whatever you want to do with the file
      console.log("read file", file);
      let rawdata = fs.readFileSync(path.join(uiPagePath, file));
      let data = JSON.parse(rawdata);
      saveUiPage(_.replace(file, ".json", ""), JSON.stringify(data));
    });
  });
}

function syncConfig() {
  fs.readdir(configPath, function(err, files) {
    //handling error
    if (err) {
      return console.log("Unable to scan directory: " + err);
    }
    //listing all files using forEach
    files.forEach(function(file) {
      // Do whatever you want to do with the file
      console.log("read file", file);
      let rawdata = fs.readFileSync(path.join(configPath, file));
      let data = JSON.parse(rawdata);
      saveConfig(_.replace(file, ".json", ""), JSON.stringify(data));
    });
  });
}

const httpsAgent = new Agent({
  rejectUnauthorized: false
});

async function saveUiPage(url, config_data, type = "CHIAKI_PAGE") {
  console.info("start save url: " + url);
  if (url === "product") {
    type = "PRODUCT";
    url = undefined;
  } else if (url === "category") {
    type = "CATEGORY";
    url = undefined;
  }
  try {
    await axios.post(BACKEND_ENV.endpoint, {
      action: {
        type: "save-chiaki-page",
        payload: {
          user_id: BACKEND_ENV.user_id,
          type,
          url,
          store_id: BACKEND_ENV.store_id,
          config_data,
          additional_data: ""
        }
      }
    }, { httpsAgent });
    console.log(`save url: ${url} page success`);
  } catch (e) {
    console.error(e);
  }
}

async function saveConfig(key, value) {
  console.info("start save config key: " + key);
  try {
    const res = await axios.post(BACKEND_ENV.endpoint, {
      action: {
        type: "save-chiaki-config",
        payload: {
          user_id: BACKEND_ENV.user_id,
          key,
          value,
          store_id: BACKEND_ENV.store_id
        }
      }
    }, { httpsAgent });
    console.log(`save config: ${key} success`);
  } catch (e) {
    console.error(e);
  }
}

syncUiPage();
syncConfig();
