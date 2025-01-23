type CreditSlipData = {
  // Дата и время создания карточки УПД в тг боте
  idn_datetime: string
  // Email ответственного пользователя(тот кто нажал кнопку "отправить")
  responsible_user_email: string
  // Вид операции(константа)
  operation_kind: string
  // guid объекта строительства
  building_guid: string
  // guid Генерального Подрядчика(сейчас это константа)
  gen_contractor_guid: string
  // guid категории материалов
  material_category_guid: string
}

type UTDDocument = {
  // guid файла УПД
  idn_file_guid: string
  // Ссылка на скачивание файла УПД
  idn_link: string
  // Наименование файла
  idn_file_name: string
}

// * Схема входного сообщения из Кафки
type UTDCardInputMessage = {
  // guid карточки подгрузки УПД (guid запроса)
  guid: string
  credit_slip_data: CreditSlipData
  documents: UTDDocument[]
}

type UTDEntityWithParamsAndNoms = {
  idn_number?: string
  idn_date?: string
  supplier_inn?: string
  pages_numbers_list: number[]
  nomenclatures_list?: string[]
}

export type UTDMetadatas = UTDCardInputMessage & UTDEntityWithParamsAndNoms & {}
