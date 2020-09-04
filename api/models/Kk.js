module.exports = {
    attributes: {
        name: {
            type: 'string',
        },
        abbrev: {
            type:'string',
            unique: true,
        },
    }
}