module.exports = {
    tableName: 'final_project',
    attributes: {
        student: {
            columnName: 'student_id',
            model: 'student',
        },
        topic: {
            columnName: 'topic_id',
            model: 'topic'
        },
        topicTitle: {
            columnName: 'topic_title',
            type: 'string'
        },
        topicTitleStatus: {
            columnName: 'topic_title_status',
            type: 'string',
            isIn: ['WAITING', 'APPROVED', 'REJECTED']
        },
        period: {
            columnName: 'period_id',
            model: 'period'
        },
        fileLink: {
            columnName: 'file_link',
            type: 'string',
            allowNull: true
        },
        reviewer: {
            columnName: 'reviewer_id',
            model: 'lecturer'
        },
    }
}