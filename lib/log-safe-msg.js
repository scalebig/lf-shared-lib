const flatted = require('flatted')
const copy = require('./copy')
const traverse = require('traverse')

module.exports = (info) => {
  const deletionArray = [ 'messageList', 'isApiError', 'details', 'moodleToken', 'jwt', 'jwtToken', 'password' ]
  // let infoCopy = _.cloneDeep(info)
  let infoCopy = null

  try {
    infoCopy = copy(info)
  } catch (ex) {
    // most likely a circular ref
  }

  if (!infoCopy) {
    if (info.toJSON) {
      infoCopy = JSON.parse(info.toJSON())
    } else {
      try {
        infoCopy = flatted.parse(flatted.stringify(info))
      } catch (ex) {

      }
    }
  }
  // fine - can't copy for some reason - at least
  if (!infoCopy) {
    // giving up?
    infoCopy = {
      primaryCode: `LF_UNABLE_TO_SERIALIZE_MSG`
    }
  }

  // if (infoCopy.msg && infoCopy.msg.messageList) {
  //   infoCopy = {...infoCopy, ...infoCopy.msg.messageList[0]}
  // }

  traverse(infoCopy).forEach(entity => {
    if (entity) {
      deletionArray.forEach(item => {
        delete entity[item]
      })
    }
  })

  // if (infoCopy.details) {
  //   infoCopy = {...infoCopy, ...infoCopy.details}
  // }

  if (infoCopy.msg && infoCopy.msg.request) {
    delete infoCopy.msg.request.requestMethod
    if (infoCopy.msg.request.user) {
      delete infoCopy.msg.request.user.enrolledCourses
      delete infoCopy.msg.request.user.groupIdList
      delete infoCopy.msg.request.user.config
      delete infoCopy.msg.request.user.access
    }
  }

  return infoCopy
}
