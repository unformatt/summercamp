import { filter as filterList, isEmpty, isArray, uniq } from 'lodash'

export function filterData(data, filters) {
  /*
    From a high level, all the filters need to match.
    But at each filter level, a filter is an array of possible values and only one vaue
    at the individual filter level needs to match.
    Essentially all filters are joined with an AND but each value in a single filter is joined with OR

    e.g. Returns 2 rows (Laura and Bob)
    filterData([
      { name: "Laura", ages: "Adult; Elementary;" },
      { name: "Bob", ages: "Elementary;" },
      { name: "Foo", ages: "" },
    ],
      { ages: ["ADULT", "elementary"] }
    )

    e.g. Returns 1 row (Bob)
    filterData([
      { name: "Laura", ages: "Adult; Elementary;" },
      { name: "Bob", ages: "Elementary;" },
      { name: "Foo", ages: "" },
    ],
      { name: "Bob", ages: ["ADULT", "elementary"] }
    )
  */

  return filterList(data, row => {
    let matchAll = true
    Object.keys(filters).forEach(key => {
      let filterValues = filters[key]

      if (isEmpty(filterValues)) return

      if (!isArray(filterValues)) {
        filterValues = [filterValues]
      }

      filterValues = filterValues.map(normalizeString)
      const val = normalizeString(row[key])

      let matchFilter = false
      filterValues.forEach(fval => {
        matchFilter = matchFilter || val.indexOf(fval) > -1
      })
      matchAll = matchAll && matchFilter
    })
    return matchAll
  })
}

const normalizeString = s =>
  String(s)
    .toLowerCase()
    .trim()

export const uniqueValues = (rows, prop, multiValDelimiter = ';') => {
  const values = []
  rows.forEach(o =>
    String(o[prop] || '')
      .split(multiValDelimiter)
      .forEach(v => values.push(normalizeString(v)))
  )
  return uniq(values).filter(v => v && v.length)
}
