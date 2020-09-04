module.exports = {
    attributes: {
        semester: {
            type: 'string',
            isIn: ['GANJIL','GENAP']
        },
        academicYear: {
            columnName: 'academic_year',
            type: 'string'
        },
    },
    
    forestay:{
        index: {
          showId:true,
          showCreatedAt:false,
          showUpdatedAt:false,
          footerHtml:"<p style='font-size: 8px'>Copyright (c) 2020</p>"
        },
        createUpdate:{
          labelWidth: 200
        },
        title: "aplikasi_ta1",
        urlPrefix :"/periodsForestay/",
      },
}