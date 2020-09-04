module.exports = {
    attributes: {
        name: {
            type: 'string'
        },
        quota: {
            type: 'number',
            description: 'Quota per group. Maksimum jumlah anggota per kelompok.'
        },
        kk: {
            columnName: 'kk_id',
            model: 'kk'
        },
        peminatan: {
            columnName: 'peminatan_id',
            model: 'peminatan'
        },
        period: {
            columnName: 'period_id',
            model: 'period'
        },
        lecturer: {
            columnName: 'lecturer_id',
            model: 'lecturer'
        },
        isDeleted: {
            columnName: 'is_deleted',
            type: 'boolean',
        },
        groups: {
            collection: 'group',
            through: 'topicselection',
            via: 'topic'
        }
    }
}