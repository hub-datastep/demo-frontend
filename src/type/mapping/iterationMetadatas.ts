type CreditSlipData = {
  // Дата и время создания карточки УПД в тг боте
  idn_datetime: string
  // Email ответственного пользователя(тот кто нажал кнопку "отправить")
  responsible_user_email: string
  // Вид операции(константа)
  operation_kind: string
  // guid объекта строительства
  building_guid: string
  // Название объекта строительства
  building_name: string
  // guid Генерального Подрядчика(сейчас это константа)
  gen_contractor_guid: string
  // guid категории материалов
  material_category_guid: string
}

export type UTDDocument = {
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

type UTDEntityParams = {
  // Номер УПД
  idn_number?: string
  // Дата УПД
  idn_date?: string
  // ИНН организации (покупатель со стороны Унистрой)
  organization_inn?: string
  // ИНН поставщика
  supplier_inn?: string
  // Номер исправления УПД (Integrated Delivery Note)
  correction_idn_number?: string
  // Дата исправления УПД
  correction_idn_date?: string
  // Наименование договора поставки
  contract_name?: string
  // Номер договора поставки
  contract_number?: string
  // Дата договора поставки
  contract_date?: string
}

type UTDEntityWithParamsAndNoms = UTDEntityParams & {
  pages_numbers_list: number[]
  nomenclatures_list?: string[]
}

type MappedMaterial = {
  // Номер по списку
  number: number
  // Наименование материала как в УПД
  idn_material_name: string
  // guid материала (из справочника НСИ)
  material_guid?: string
  // Количество полученного материала
  quantity?: number
  // Цена материала за единицу
  price?: number
  // Сумма материала за весь объем
  cost?: number
  // Ставка НДС (0.00 - если без НДС)
  vat_rate?: number
  // Сумма НДС
  vat_amount?: number
}

// * Схема выходного сообщения из Кафки со ссылкой на результаты для проверки
type UTDCardCheckResultsOutputMessage = {
  // guid карточки подгрузки УПД (guid запроса)
  guid: string
  // guid файла УПД
  idn_file_guid: string
  // guid объекта строительства
  building_guid: string
  // guid категории материалов
  material_category_guid: string
  // Ссылка на проверку результата
  check_results_url: string
  // ИНН поставщика
  supplier_inn?: string
  // Наименование договора поставки
  contract_name?: string
}

export type UTDMetadatas = {
  entity: UTDEntityWithParamsAndNoms
  input_message: UTDCardInputMessage
  mapped_materials?: MappedMaterial[]
  check_results_output_message: UTDCardCheckResultsOutputMessage
}
