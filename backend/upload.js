const IncomingForm = require("formidable").IncomingForm;

module.exports = function upload(req, res) {
  var form = new IncomingForm();

  form.on("file", (field, file) => {
    // Do something with the file
    // e.g. save it to the database
    console.log("file " + file.name + " is here uploaded");
  });
  form.on("end", () => {
    res.json();
  });
  form.parse(req);
};
