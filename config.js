export const LocaleEnum = {
  EN :'en',
  ZH :'zh-Hans',
  SPANISH :'es',
  VIETNAMESE :'vi',
  PORTUGUESE :'pt',
  INDIA :'hi',
  INDONESIAN :'id',
  THAI :'th',
  FILIPINO :'tlPh',
}

export const toJson = {
  input: './translation-done.xlsx',
  output: './locales'
}

export const toExcel = {
  input: '../locales',
  output: './translation-todo.xlsx'
}