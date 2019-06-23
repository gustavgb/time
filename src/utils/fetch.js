import { useState, useEffect } from 'react'
import axios from 'axios'

const isClient = !!(
  (typeof window !== 'undefined' &&
  window.document && window.document.createElement)
)

const preloads = []
let cache = {}

if (isClient) {
  window.getCache = () => cache
}

const urlToKey = (url) => url.replace(/[-!$%^&*()_+|~=`{}[\]:";'<>?,./]/g, '_').replace(/_{2,}/, '_')

export const applyPreloading = (markup) => {
  return new Promise((resolve, reject) => {
    Promise.all(preloads)
      .then(results => {
        return results.reduce((acc, result) => {
          acc[result[0]] = result[1].data
          return acc
        }, {})
      })
      .then((preloaded) => {
        const appMarkup = markup.replace(/{{FETCH_PLACEHOLDER.(_|\w)+.((_|\w)+)+}}/g, (match) => {
          const path = match.replace(/^{{FETCH_PLACEHOLDER./, '').replace(/}}$/, '').split('.')
          const data = preloaded[path[0]]

          if (data) {
            const item = path.slice(1).reduce((acc, current) => {
              if (acc && acc[current]) {
                return acc[current]
              } else {
                return null
              }
            }, data)

            if (item) {
              preloaded[match] = item

              return item
            } else {
              return ''
            }
          }

          return ''
        })

        const result = `<div style="display: none;" id="preload-cache">${JSON.stringify(preloaded)}</div>${appMarkup}`

        resolve(result)
      })
      .catch(err => {
        console.error(err)
        reject(err)
      })
  })
}

export const hydrate = () => {
  const el = document.getElementById('preload-cache')
  cache = JSON.parse(el.innerText)

  el.parentNode.removeChild(el)
}

const axiosWithCache = (url) => {
  const key = urlToKey(url)

  console.log(key, cache)

  if (cache[key]) {
    const data = cache[key]
    delete cache[key]
    return Promise.resolve(data)
  } else {
    return new Promise((resolve, reject) => {
      axios(url)
        .then(res => resolve(res.data))
        .catch(reject)
    })
  }
}

const recursiveGenerateId = (namespace, obj) => {
  if (Array.isArray(obj)) {
    return obj.map((item, index) => recursiveGenerateId(namespace + '.' + index, item))
  } else if (typeof obj === 'object' && obj !== null) {
    return Object.keys(obj).reduce((acc, key) => {
      acc[key] = recursiveGenerateId(namespace + '.' + key, obj[key])
      return acc
    }, {})
  } else {
    const key = `{{FETCH_PLACEHOLDER.${namespace}}}`
    if (cache[key]) {
      const cachedValue = cache[key]
      delete cache[key]
      return cachedValue
    }
    return key
  }
}

export const useFetch = (initialUrl, initialData, { preventPreload = false } = {}) => {
  const [data, setData] = useState(initialData)
  const [url, setUrl] = useState(initialUrl)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [begunPreload, setBegunPreload] = useState(false)

  if (!begunPreload && initialUrl) {
    setBegunPreload(true)

    if (initialData) {
      const template = recursiveGenerateId(urlToKey(initialUrl), initialData)

      setData(template)
    }

    if (!isClient) {
      preloads.push(Promise.all([Promise.resolve(urlToKey(initialUrl)), axios(initialUrl)]))
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false)
      setIsLoading(true)

      try {
        const result = await axiosWithCache(url)

        setData(result)
      } catch (error) {
        setIsError(true)
      }

      setIsLoading(false)
    }
    fetchData()
  }, [url])

  return [{ data, isLoading, isError }, setUrl]
}
