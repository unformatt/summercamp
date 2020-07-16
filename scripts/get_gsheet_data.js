const dotenv = require('dotenv'); dotenv.config()
const fs = require('fs')
const slugify = require('slugify')
const { GoogleSpreadsheet } = require('google-spreadsheet')

const REQUIRED_VARS = ['GSHEETS_CREDS_JSON', 'CAMP_DATA_FILE', 'GSHEET_ID']

REQUIRED_VARS.forEach(v =>
  console.assert(process.env[v], `process.env.${v} not defined`)
)

const slugifyHeader = v =>
  slugify(v, {
    replacement: '_',
    lower: true, // convert to lower case
  }).replace(/-/g, '_') // non-spaces are still replaced with '-' despite replacement: '_'

async function main() {
  const creds = require('../' + process.env.GSHEETS_CREDS_JSON)
  const doc = new GoogleSpreadsheet(process.env.GSHEET_ID)
  await doc.useServiceAccountAuth(creds)
  await doc.loadInfo()

  console.log('Loaded spreadsheet: ' + doc.title)

  const sheet = doc.sheetsByIndex[0]

  await sheet.loadHeaderRow()
  const fields = sheet.headerValues.map(slugifyHeader)
  const rowsRaw = await sheet.getRows()
  const rows = rowsRaw.map(row =>
    row._rawData.reduce((prevVal, newVal, i) => {
      prevVal[fields[i]] = newVal
      return prevVal
    }, {})
  )

  const outputFile = process.env.CAMP_DATA_FILE
  fs.writeFileSync(outputFile, JSON.stringify({ fields, rows }))
  console.log(`Wrote ${rows.length} rows to ${outputFile}`)
}

main()
