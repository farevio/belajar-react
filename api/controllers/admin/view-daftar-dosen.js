const newLecturer = require("./new-lecturer");

module.exports = {
    friendlyName: 'View master data',

    description: 'Menampilkan semua master data',

    exits: {
        success: {
            responseType: 'view',
            viewTemplatePath: 'pages/admin/daftar-dosen'
        },
    },
    fn: async function (input, exits) {
        const kkList = await Kk.find();
        const peminatanList = await Peminatan.find();
        const roleList = await MasterRole.find();
        const dosenList = await Lecturer.find();
        //const jfaList = await Jfa.find();
        return exits.success({peminatanList,roleList,dosenList,kkList});
    }
}
