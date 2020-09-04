module.exports = {
    tableName: 'app_setting',
    attributes: {
        name: {
            type: 'string',
            unique: true
        },
        settingValue: {
            columnName: 'setting_value',
            type: 'string'
        },
    },
    getPeriodId: async function () {
        const periodSetting = await AppSetting.findOne({ name: 'period_id' });
        return periodSetting.settingValue;
    }
}