module.exports = {
    tableName: 'topic_selection',
    attributes: {
        topic: {
            columnName: 'topic_id',
            model: 'topic',
        },
        optionNum: {
            columnName: 'optionNum',
            type: 'number',
            isIn: [1, 2]
        },
        period: {
            columnName: 'period_id',
            model: 'period'
        },
        status: {
            type: 'string',
            isIn: ['WAITING', 'APPROVED', 'REJECTED', 'AUTO_CANCELLED']
        },
        group: {
            columnName: 'group_id',
            model: 'group' 
        },
    }
}