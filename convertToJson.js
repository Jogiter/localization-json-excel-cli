import { unflatten } from 'flat'
import { writeFileSync, existsSync, mkdirSync } from 'fs'
import { join } from 'path'
import ExcelJS from 'exceljs/dist/es5/index.js'
import { LocaleEnum, toJson } from './config.js'
import { getKeyByValue } from './utils.js'

async function convertToExcel() {
  const workbook = new ExcelJS.Workbook();
  const data = await workbook.xlsx.readFile(toJson.input);

  const writeLocale = (worksheet) => {
    const json = {}
    const locale = getKeyByValue(LocaleEnum, worksheet.name)
    const rows = worksheet.getSheetValues()
    // console.log(rows)
    rows.forEach((row) => {
      const key = row[1]
      const value = row[2]
      json[key] = value
    })
    // console.log(LocaleEnum[locale], json)

    delete json.Keys
    if (!existsSync(toJson.output)) {
      mkdirSync(toJson.output)
    }
    writeFileSync(join(toJson.output, `${LocaleEnum[locale]}.json`), JSON.stringify(unflatten(json), null, 2))
  }

  const promises = []
  data.worksheets.forEach((worksheet) => {
    promises.push(writeLocale(worksheet))
  })


  await Promise.all(promises)
  console.log(`Convert Excel to JSON Done!`)
}

convertToExcel()