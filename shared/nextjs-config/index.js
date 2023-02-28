const next12 = require("./next12.js");
const next13 = require("./next13.js");

const nextjsConfig = (version, config) => {
  switch (version) {
    case 12:
      return next12.config(config);
    case 13:
    default:
      return next13.config(config);
  }
};

module.exports = nextjsConfig;
