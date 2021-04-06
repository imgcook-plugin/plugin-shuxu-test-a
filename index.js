const handler = require('./dist/index');

/**
 * @name plugin example
 * @param option: { data, filePath, config }
 * - data: module and generate code Data
 * - filePath: Pull file storage directory
 * - config: cli config
 */

const pluginHandler = async options => {
  // let { data, filePath, config  } = options;
  // options.data.code.panelDisplay[0].panelValue = `${options.data.code.panelDisplay[0].panelValue}`.replace('想看', '哈哈哈哈会');

  const newOptions = handler.default(options);


  // data.moduleData.json = data.moduleData.json.replace(/影片名/g, '打算粉红色的');
  // data.moduleData.jsonv2 = data.moduleData.jsonv2.replace(/影片名/g, '打算粉红色的');
  // body...
  return newOptions;
};

module.exports = (...args) => {
  return pluginHandler(...args).catch(err => {
    console.log(err);
  });
};
