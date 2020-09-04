const fs = require("fs");
const mysql = require("mysql");
const fastcsv = require("fast-csv");
module.exports = {
    friendlyName: 'Input CSV Metlit',

    description: 'Menginputkan data metlit melalui upload csv',

    files: ['file_csv'],

    inputs: {

        file_csv: {
            type: 'ref',
            required: true
        }
    },

    exits: {
        success: {}
    },

    fn: async function (inputs, exits) {
        var info = await sails.uploadOne(inputs.file_csv);

        var fileName = info.fd;
        let stream = fs.createReadStream(fileName);
        let csvData = [];
        let csvStream = fastcsv.parse()
            .on("data", function (data) {
                csvData.push(data);
            })
            .on("end", function () {
                // remove the first line: header
                csvData.shift();

                const connection = mysql.createConnection({
                    host: "localhost",
                    user: "root",
                    password: "",
                    database: "taproposal"
                });
                connection.connect(error => {
                    if (error) {
                        console.error(error);
                    } else {
                        let query =
                            "INSERT INTO metlit ( class, period_id) VALUES ?";
                        connection.query(query, [csvData], (error, response) => {
                            console.log(error || response);
                        });
                    }
                });
            });

        stream.pipe(csvStream);
        return exits.success();
    }
}







