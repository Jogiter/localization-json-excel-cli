import { flatten } from 'flat'
import { readFileSync } from 'fs'
import { join } from 'path'
import ExcelJS from 'exceljs/dist/es5/index.js'
import { LocaleEnum, toExcel } from './config.js'
import { getKeyByValue } from './utils.js'

async function convertToExcel() {
  const workbook = new ExcelJS.Workbook();

  const addLocales = async (jsonFile = 'en.json', locale = 'en') => {
    const name = locale
    const worksheet = workbook.addWorksheet(name);

    worksheet.columns = [
      {
        header: 'Keys',
        key: 'key',
        width: 50
      },
      {
        header: getKeyByValue(LocaleEnum, locale),
        key:  locale,
        width: 300
      }
    ]

    worksheet.views = [
      { state: 'frozen', xSplit: 0, ySplit: 1, activeCell: 'B2' }
    ]

    // make header bold
    worksheet.getRow(1).font = { bold: true }

    const json = JSON.parse(await readFileSync(jsonFile, 'utf8'))
    const flattenJson = flatten(json)
    // console.log(flattenJson)

    for (const [key, value] of Object.entries(flattenJson)) {
      worksheet.addRow({
        key,
        [locale]: value
      })
    }
  }

  const promises = []
  Object.values(LocaleEnum).forEach((locale) => promises.push(addLocales(join(toExcel.input, `${locale}.json`), locale)))
  await Promise.all(promises)

  await workbook.xlsx.writeFile(toExcel.output);
  console.log(`Convert JSON to Excel Done!`)
}

convertToExcel()