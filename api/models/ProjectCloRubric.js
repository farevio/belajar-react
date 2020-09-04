module.exports = {
    tableName: 'project_clo_rubric',
    attributes: {
        project: {
            columnName: 'project_id',
            model: 'project'
        },
        cloRubric: {
            columnName: 'clo_rubric_id',
            model: 'clorubric',
        },
        givenBy: {
            columnName: 'given_by_id',
            model: 'lecturer'
        }
    },
}
