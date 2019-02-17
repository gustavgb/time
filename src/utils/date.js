const padNumber = (number) => number < 10 ? '0' + number : number

export const formatDate = (rawDate) => {
  const date = new Date(rawDate)
  const dateTime = date.getTime()
  const nowTime = Date.now()
  const now = new Date(nowTime)

  const formattedTime = `${padNumber(date.getHours())}:${padNumber(date.getMinutes())}`

  console.log(now.getDay(), date.getDay())
  if (Math.abs(nowTime - dateTime) > 86400000 || now.getDay() !== date.getDay()) {
    return `${date.getFullYear()}/${padNumber(date.getMonth() + 1)}/${padNumber(date.getDate())} ${formattedTime}`
  } else {
    return formattedTime
  }
}

export const getEditableDate = (isoDate) => {
  const date = new Date(isoDate)

  return `${date.getFullYear()}/${padNumber(date.getMonth() + 1)}/${padNumber(date.getDate())} ${padNumber(date.getHours())}:${padNumber(date.getMinutes())}`
}

export const getIsoDate = (editableDate) => {
  const date = editableDate.split(' ')[0].split('/')
  const year = parseInt(date[0], 10)
  const month = parseInt(date[1], 10) - 1
  const day = parseInt(date[2], 10)

  const time = editableDate.split(' ')[1].split(':')
  const hours = parseInt(time[0], 10)
  const minutes = parseInt(time[1], 10)

  const final = new Date()
  final.setFullYear(year)
  final.setMonth(month)
  final.setDate(day)
  final.setHours(hours)
  final.setMinutes(minutes)

  return final.toISOString()
}

export const getCurrentTime = () => new Date(Date.now()).toISOString()

export const getDiffTime = (timeA, timeB) => {
  const d = Math.abs(new Date(timeA).getTime() - new Date(timeB).getTime())

  const hours = Math.floor(d / 3600000)
  const minutes = Math.floor((d % 3600000) / 60000)

  return `${hours}:${padNumber(minutes)}`
}
