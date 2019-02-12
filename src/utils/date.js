const padNumber = (number) => number < 10 ? '0' + number : number

export const formatDate = (rawDate) => {
  const date = new Date(rawDate)
  const dateTime = date.getTime()
  const nowTime = Date.now()
  const now = new Date(dateTime)

  const formattedTime = `${padNumber(date.getHours())}:${padNumber(date.getMinutes())}`

  if (Math.abs(nowTime - dateTime) > 86400000 && now.getDay() !== date.getDay()) {
    return `${date.getFullYear()}/${padNumber(date.getMonth() + 1)}/${padNumber(date.getDate())} ${formattedTime}`
  } else {
    return formattedTime
  }
}
