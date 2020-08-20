const path = require('path');
const fs = require('fs');
const axios = require('axios');
function updateXML(xmlTemplate, data) {
  if (data !== undefined) {
    Object.keys(data).forEach(key => {
      const regex = new RegExp(key.trim(), 'g');
      xmlTemplate = xmlTemplate.replace(regex, data[key]);
    });
  }
  return xmlTemplate;
}

module.exports = {
  postToWorkday: async (endpoint, xmlTemplateFilePath, testData) => {
    const xml = fs
      .readFileSync(path.resolve(__dirname, xmlTemplateFilePath))
      .toString();
    const body = updateXML(xml, testData);
    console.log(body);
    try {
      return await axios({
        method: 'post',
        url: 'https://wd3-impl-services1.workday.com/ccx/service/thoughtworks' + endpoint,
        headers: {
          'Content-Type': 'text/xml'
        },
        data: body
      })
      // .then(function (response) {
      //   console.log(response.data);
      //   // response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
      // });
    } catch (error) {
      var errorMessage =
        'Error occurred while accessing workday API. Status code:' +
        (error.response ? error.response.status : '- Something went wrong');
      errorMessage +=
        '\r\nResponse Data:' +
        (error.response ? error.response.data : 'No Response');
      throw new Error(errorMessage);
    }
  }
}



