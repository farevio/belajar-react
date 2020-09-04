module.exports = {
    friendlyName: "Edit topic",

    description: "Edit topik dosen",

    inputs: {
        id: {
            required: true,
            type: 'number'
        },
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
            responseType: 'redirect',
        },
        quotaConflict: {
            description: 'kuota lebih kecil daripada jumlah anggota kelompok yang terdaftar',
        }
    },

    fn: async function(inputs,exits) {
        const topicSelections = await TopicSelection.find({topic: inputs.id}).populate('group');
        const maxTotalStudents = topicSelections.reduce((maxTotalStudents = 0, ts)=> {
            return Math.max(ts.group.totalStudents, maxTotalStudents);
        }, 0);
        if(maxTotalStudents && inputs.quota < maxTotalStudents) {
            return exits.quotaConflict({minQuota: maxTotalStudents});
        }
        const peminatan = await Peminatan.findOne({id: inputs.peminatanId});
        await Topic.updateOne({id: inputs.id}).set({
            name: inputs.name,
            quota: inputs.quota,
            kk: peminatan.kk,
            peminatan: inputs.peminatanId
        })
        // All done.
        return exits.success('/lecturer/topics');
    }
};
