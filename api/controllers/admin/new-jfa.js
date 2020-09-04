module.exports = {
    friendlyName: 'New tabel jfa',

    description: 'Membuat jfa baru',

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
        let jfa = await Jfa.create({
            name: inputs.name,
            abbrev: inputs.abbrev
        }).fetch();

        if(jfa.id){
            
            return exits.success('/admin/master-data');
        }
        else return exits.failed();
        

    }
}