module.exports = {
    friendlyName: "New topic",

    description: "Membuat topik TA baru dan menyimpannya di database",

    inputs: {
        name: {
            reqired: true,
            type: "string"
        },
        quota: {
            required: true,
            type: "number"
        },
        peminatanId: {
            required: true,
            type: 'number'
        }
    },

    exits: {
        success: {
            responseType: 'redirect'
        }
    },

    fn: async function(inputs, exits) {
        const {kk: kkId} = await Peminatan.findOne({id: inputs.peminatanId});
        const currentPeriodId = await AppSetting.getPeriodId();
        const lecturer = await Lecturer.findOne({id: this.req.session.lecturerId});
        const newTopic = await Topic.create({
            name: inputs.name,
            lecturer: lecturer.id,
            quota: inputs.quota,
            kk: kkId,
            peminatan: inputs.peminatanId,
            period: currentPeriodId,
            isDeleted: false
        }).fetch();
        exits.success('/lecturer/topics')
        // All done.
        return;
    }
};
