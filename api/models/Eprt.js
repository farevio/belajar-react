module.exports = {
    tableName: 'eprt',
    attributes: {
        score: {
            type: 'string',
            required: true
        },
        eprtUrl: {
            type: 'string',
            required: true
        },
        eprtFd: {
            type: 'string',
            required: true
        },

        owner: {
            columnName: 'student_id',
            model: 'student',
            unique: true
        }
    }
};