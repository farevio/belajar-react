module.exports = {
    friendlyName: 'New tabel kk',

    description: 'Membuat kk baru',

    inputs: {
        name: { required: true, type: 'string' },
        abbrev: { required: true, type: 'string' }
    },

    exits: {
        success: {
            responseType: 'redirect'
        },
        failed: {}
    },

    fn: async function (inputs, exits) {
        let kk = await Kk.create({
            name: inputs.name,
            abbrev: inputs.abbrev
        }).fetch();


        if(kk.id){
            
            return exits.success('/admin/master-data');
        }
        else return exits.failed();


    }
}