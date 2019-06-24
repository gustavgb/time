import { useState, useEffect } from 'react'
import axios from 'axios'

const isClient = !!(
  (typeof window !== 'undefined' &&
  window.document && window.document.createElement)
)

const preloads = []
let preloading = false

const urlToKey = (url) => url.replace(/[-!$%^&*()_+|~=`{}[\]:";'<>?,./]/g, '_').replace(/_{2,}/, '_')

export const beginPreloading = () => {
  preloading = true
}

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
              return item
            } else {
              return ''
            }
          }

          return ''
        })

        const preloadTag = `<script>window.__PRELOADED_DATA__ = ${JSON.stringify(preloaded)}</script>`

        resolve([appMarkup, preloadTag])
      })
      .catch(err => {
        console.error(err)
        reject(err)
      })

    preloads.length = 0
    preloading = false
  })
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
    return `{{FETCH_PLACEHOLDER.${namespace}}}`
  }
}

export const useFetch = (initialUrl, initialData, { preventPreload = false } = {}) => {
  const cache = (isClient && window.__PRELOADED_DATA__) || {}
  const key = urlToKey(initialUrl)
  let foundCache = false
  if (cache[key]) {
    initialData = cache[key]
    delete cache[key]
    foundCache = true
  }

  if (!isClient && preloading && initialUrl && !preventPreload) {
    if (initialData) {
      const template = recursiveGenerateId(urlToKey(initialUrl), initialData)

      initialData = template
    }

    preloads.push(Promise.all([Promise.resolve(urlToKey(initialUrl)), axios(initialUrl)]))
  }

  const [data, setData] = useState(initialData)
  const [url, setUrl] = useState(initialUrl)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  if (isClient) {
    useEffect(() => {
      const fetchData = async () => {
        setIsError(false)
        setIsLoading(true)

        try {
          if (!foundCache) {
            const result = await axios(url)

            setData(result.data)
          }
        } catch (error) {
          setIsError(true)
        }

        setIsLoading(false)
      }
      fetchData()
    }, [url])
  }

  return [{ data, isLoading, isError }, setUrl]
}
