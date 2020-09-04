module.exports = {
    friendlyName: 'New tabel peminatan',

    description: 'Membuat peminatan baru',

    inputs: {
        name: { required: true, type: 'string' },
        abbrev: { required: true, type: 'string' },
        kk_id: { required: true, type: 'number' }
    },

    exits: {
        success: {
            responseType: 'redirect'
        },
        failed: {}
    },

    fn: async function (inputs, exits) {
        let peminatan = await Peminatan.create({
            name: inputs.name,
            abbrev: inputs.abbrev,
            kk_id: inputs.kk_id
        }).fetch();
        if(peminatan.id){
            
            return exits.success('/admin/master-data');
        }
        else return exits.failed();
    }
}