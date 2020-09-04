module.exports = {
    friendlyName: 'New tabel app setting',

    description: 'Membuat appsetting baru',

    inputs: {
        name: { required: true, type: 'string' },
        setting_value: { required: true, type: 'string' }
    },

    exits: {
        success: {
            // viewTemplatePath: 'pages/admin/new-app'
        }
    },

    fn: async function (inputs, exits) {
        let app = await AppSetting.create({
            name: inputs.name,
            settingValue: inputs.setting_value
        }).fetch();
        return this.res.send({ app });
    }
}