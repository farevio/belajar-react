module.exports = {
    tableName: 'clo_rubric',
    attributes: {
        clo: {
            columnName: 'clo_id',
            model: 'clo',
        },
        rubricCode: {
            columnName: 'rubric_code',
            type: 'number'
        },
        score: {
            type: 'number'
        },
        description: {
            type: 'string'
        },
        isDeleted: {
            columnName: 'is_deleted',
            type: 'boolean'
        }
    }
}
