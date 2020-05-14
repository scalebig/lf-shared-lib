const lfNum = require('./lf-num')
let self = module.exports = {
  findAllNestedEntries: (entries) => {
    const allEntries = []
    const mapEntries = (entries) =>
      entries.forEach(entry => {
        if (entry.type === 'table') {
          mapEntries(entry.cellDef)
        } else if (entry.type !== 'label') {
          allEntries.push(entry)
        }
      })
    mapEntries(entries)
    return allEntries
  },

  findAllEntries: (definition = []) => {
    let allEntries = []
    definition.forEach((item) => { allEntries = allEntries.concat(self.findAllNestedEntries(item.entries)) })
    return allEntries
  },

  getGradeItemCount: (definition) => {
    let definitionGradeItemCount = 0
    if (definition.pageFieldDefinitions && definition.pageFieldDefinitions.length > 0) {
      definitionGradeItemCount += 1
    }
    if (definition.pageCalculations) {
      definitionGradeItemCount += self.findAllEntries(definition.pageCalculations).length
    }
    return definitionGradeItemCount
  },
  getGradeItemsFromDefinition: (definition) => {
    let gradeItems = []
    if (definition.pageCalculations) {
      gradeItems = [...self.findAllEntries(definition.pageCalculations)]
    }
    if (definition.pageFieldDefinitions && definition.pageFieldDefinitions.length > 0) {
      gradeItems.unshift({
        definitionItemId: definition.pageFieldProperties.id,
        points: definition.pageFieldProperties.points,
        itemType: 1
      })
    }
    return gradeItems
  },
  // trims out any orphaned grade items due to report definition edits
  getRelevantGradeItems: (gradeItemList, definitionItemList) => {
    let relevantGradeItems = []
    gradeItemList.forEach(dbItem => {
      let matchingItem = definitionItemList.find(defItem => {
        if (defItem.definitionItemId) {
          return dbItem.definitionItemId.toString() === defItem.definitionItemId.toString()
        } else {
          return dbItem.definitionItemId === defItem.calculationId
        }
      })
      if (matchingItem) {
        relevantGradeItems.push(dbItem)
      }
    })
    return relevantGradeItems
  },
  // rounds the bounds of a defined range based on decimals or sig figs
  getRoundedRangeMsg: (targetValue, bounds, gradingCriteria) => {
    const { significantFigures, decimalPlaces } = gradingCriteria
    let lowerLimit = bounds.lowerMultiplier * targetValue
    let upperLimit = bounds.upperMultiplier * targetValue
    if (significantFigures && significantFigures.value) {
      lowerLimit = lfNum(lowerLimit).toSigFigCount(Number(significantFigures.value), true)
      upperLimit = lfNum(upperLimit).toSigFigCount(Number(significantFigures.value), true)
    } else if (decimalPlaces && decimalPlaces.value) {
      const numDecimals = Number(decimalPlaces.value)
      lowerLimit = lfNum(lowerLimit).round(numDecimals)
      upperLimit = lfNum(upperLimit).round(numDecimals)
    } else {
      lowerLimit = lfNum(lowerLimit).round(5)
      upperLimit = lfNum(upperLimit).round(5)
      if (lowerLimit.toString().includes('e')) {
        lowerLimit = lfNum(lowerLimit.strNum).toSigFigCount(6, true)
        upperLimit = lfNum(upperLimit.strNum).toSigFigCount(6, true)
      }
    }
    return `${lowerLimit} - ${upperLimit}`
  }
}
