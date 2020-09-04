module.exports = {
    friendlyName: 'Set current period',
    
    description: 'Mengganti currentPeriod dengan periode yang baru dan soft-delete topic yang sudah terpilih',

    inputs: {
        semester: {required: true, type: 'string', isIn: ['GANJIL', 'GENAP']},
        academicYear: {required: true, type: 'string'}
    },

    exits: {

    },
    
    fn: async function(inputs, exits) {
        const prevPeriodId = await AppSetting.getPeriodId();
        const prevTopicSelections = TopicSelection.find({
            where: {
                period: prevPeriodId || {'!=': null},
                status: {'nin': ['REJECTED', 'AUTO_CANCELLED']}
            },
        });
        const prevSelectedTopicIds = prevTopicSelections.map(ts => ts.topic);
        await Topic.update({id: {nin: prevSelectedTopicIds}})
        .set({isDeleted: true});
        const newPeriod = await Period.create({semester: inputs.semester, academicYear: inputs.academicYear});
        await AppSetting.updateOne({name: 'period_id'}).set({settingValue: newPeriod.id});
        return exits.success();
    }
}