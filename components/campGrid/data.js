import { html as gridHtml } from 'gridjs'
import { filter, cloneDeep } from 'lodash'
import _campsData from './camps.json'

const campsData = cloneDeep(_campsData)

const is_space_still_available = row =>
  String(row.is_space_still_available)
    .toLowerCase()
    .trim() != 'no'

const campInfoFormatter = (row, includeLocation = false) => {
  let html = `<a class="camp-link" href="${row.camp_website}" target="_blank">${row.camp_name} <img src="/assets/images/external-link.svg"/></a>`
  if (includeLocation) {
    html += `<p class="pb-2">${row.citystate}</p>`
  }
  if (row.registration_deadline && is_space_still_available(row)) {
    html += `<p class="reg-by">Reg. by ${row.registration_deadline}</p>`
  } else if (!is_space_still_available(row)) {
    html += `<p class="reg-by">No space available.</p>`
  }
  return html
}

const checkWebsiteFormatter = value =>
  value && value.trim()
    ? value
    : gridHtml('<span class="opacity-50">Check camp website</span>')

const nameSort = {
  compare: (a, b) => {
    const select = obj => obj.camp_name.toLowerCase()
    if (select(a) > select(b)) {
      return 1
    } else if (select(b) > select(a)) {
      return -1
    } else {
      return 0
    }
  },
}

export const columns = [
  {
    id: 'format',
    name: '',
    formatter: value => {
      const isOnsite = value && value.toLowerCase().indexOf('onsite') > -1
      const isOnline = value && value.toLowerCase().indexOf('online') > -1
      let html = ''
      if (isOnsite) {
        html +=
          '<img class="format-icon" title="Onsite Camp" src="/assets/images/format-onsite.svg"/>'
      }
      if (isOnline) {
        html +=
          '<img class="format-icon" title="Online Camp" src="/assets/images/format-online.svg"/>'
      }
      return gridHtml(`<span class="flex justify-center">${html}</span>`)
    },
  },
  {
    id: 'camp_name',
    name: 'Camp Name',
    sort: nameSort,
    formatter: row => gridHtml(campInfoFormatter(row)),
  },
  { id: 'citystate', name: 'City' },
  { id: 'type_of_camp', name: 'Type' },
  { id: 'dates_of_camp', name: 'Dates', formatter: checkWebsiteFormatter },
  { id: 'ages', name: 'Ages', formatter: checkWebsiteFormatter },
  {
    id: 'mobile_view',
    name: 'Camps',
    sort: nameSort,
    formatter: row => {
      let html = campInfoFormatter(row, true)
      html += `<p class="pt-2 text-sm">${row.type_of_camp}${
        row.type_of_camp ? '; ' : ''
      }${row.dates_of_camp}</p>`
      html += row.ages ? `<p class="pt-2 text-xs">${row.ages}</p>` : ''
      html += row.format ? `<p class="pt-2 text-xs">${row.format}</p>` : ''
      return gridHtml(html)
    },
  },
]

campsData.rows.forEach(row => {
  // Clone all data for camp_name and mobile_view cells, for the column formatter, which needs more
  // that just the single cell data to render
  row.camp_name = row.mobile_view = { ...row }
})

// Since GSheet column names are fragile, check that columns are valid
columns.forEach(f =>
  Object.keys(campsData.rows[0]).indexOf(f.id || f) == -1
    ? console.error(`${f.id || f} is not a valid field.`)
    : null
)

// Remove camps that do not have space available
export const rows = filter(campsData.rows, r => is_space_still_available(r))
