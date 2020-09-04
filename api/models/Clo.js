module.exports = {
    attributes: {
        plo: {
            columnName: 'plo_id',
            model: 'plo',
        },
        cloCode: {
            columnName: 'clo_code',
            type: 'string'
        },
        description: {
            type: 'string'
        },
        isDeleted: {
            columnName: 'is_deleted',
            type: 'boolean'
        }
    },
}
