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
  // Номер УПД
  idn_number?: string
  // Дата УПД
  idn_date?: string
  // ИНН поставщика
  supplier_inn?: string
  pages_numbers_list: number[]
  nomenclatures_list?: string[]
}

type SimilarMapping = {
  // guid материала НСИ
  nomenclature_guid: string
  // Наименование материала НСИ
  nomenclature: string
  // Степень семантической схожести названия материала УПД с материалов НСИ
  // От 0 до 1
  similarity_score: number
}

type MappedMaterial = {
  // Номер по списку
  number: number
  // Наименование материала как в УПД
  idn_material_name: string
  // guid материала (из справочника НСИ)
  material_guid?: string
  // Материалы НСИ, похожие на материал УПД
  // Если material_guid=null, тогда не передается
  // Если material_guid is not null, тогда передаем
  similar_mappings?: SimilarMapping[]
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
  input_message: UTDCardInputMessage
  entity: UTDEntityWithParamsAndNoms
  mapped_materials?: MappedMaterial[]
  check_results_output_message: UTDCardCheckResultsOutputMessage
}
