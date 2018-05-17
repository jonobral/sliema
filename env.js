const dotenv = require('dotenv');

module.exports = {
  getEnvVariables: () => {
    const vars = dotenv.load({ path: __dirname + '/config.env' });
    const jsonVars = {};
    for (const key in vars) jsonVars[key] = JSON.stringify(vars[key]);
    return jsonVars;
  }
};