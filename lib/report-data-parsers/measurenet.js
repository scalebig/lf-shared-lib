const csvLib = require('papaparse')

module.exports = {
  parse: (source, definition, file) => {
    let ret = {}
    let results = csvLib.parse(
      source, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,
        delimiter: '\t'
      })

    let dataSets = []
    let records = 0
    // add new array for each xy pair
    definition.xySetMap.forEach(() => {
      dataSets.push([])
    })

    let labelSets = []

    definition.xySetMap.forEach((mapItem, mapIndex) => {
      labelSets.push({ x: results.meta.fields[mapItem.x], y: results.meta.fields[mapItem.y] })
    })

    results.data.forEach((dataItem, dataIndex) => {
      definition.xySetMap.forEach((mapItem, mapIndex) => {
        dataSets[mapIndex].push({
          x: dataItem[results.meta.fields[mapItem.x]],
          y: dataItem[results.meta.fields[mapItem.y]]
        })
        records++
      })
    })
    ret.dataSets = dataSets
    ret.metaData = {
      name: file.name,
      recordCount: records,
      errors: [],
      initialData: [],
      labelSets
    }
    return ret
  }
}
