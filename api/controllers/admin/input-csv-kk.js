const fs = require("fs");
const mysql = require("mysql");
const fastcsv = require("fast-csv");
const path = require('path')
module.exports = {
    friendlyName: 'Input kk dengan file CSV',

    description: 'Input kk',

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
            .on("data", await function (data) {
                csvData.push(data);
            })
            .on("end", await function () {
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
                            "INSERT INTO kk (name, abbrev) VALUES ?";
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




