const typeList = [
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',

  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',

  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',

  'text/csv',
  'text/plain',
  'text/html',
  'application/pdf',
  'application/json',

  '.xls',
  '.xlsx',

  '.doc',
  '.docx',

  '.ppt',
  '.pptx',

  '.csv',
  '.pdf'
]

const typeImg = [
  'image/jpeg',
  'image/png',
  'image/bmp',
  'image/tiff',
  'image/jpg',
  'image/gif',
  'image/svg+xml',
  'image/heic'
]

const extensionMimeTypeMap = {
  'xls': 'application/vnd.ms-excel',
  'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'doc': 'application/msword',
  'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'ppt': 'application/vnd.ms-powerpoint',
  'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
}

module.exports = {
  typeList,
  typeImg,
  extensionMimeTypeMap,
  all: [...typeList, ...typeImg]
}
