import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  IconButton,
  HStack,
} from "@chakra-ui/react"
import { Page } from "component/page/Page"
import { PageHeading } from "component/page/PageHeading"
import { FiEdit, FiTrash2 } from "react-icons/fi"

// Sample data for the knowledge base
const knowledgeBaseData = [
  {
    question: "Почему пропуск на машину отменяют регулярно?",
    requestText:
      "Собственник. Клиент сообщает, что оформляет пропуск на машину Мерседес A088AK550, но пропуск 3 раза был отменён. Клиент уточняет, почему пропуск отменяют регулярно. Необходимо предоставить обратную связь.",
    answer:
      "В соответствии с установленным порядком пользования подземным паркингом для допуска сторонних транспортных средств на временную стоянку необходимо подать заявку с указанием следующих данных:\n" +
      "- Марка, номер и тип транспортного средства;\n" +
      "- Цель визита (гостевой, доставка, вывоз);\n" +
      "- Номер или статус машиноместа.\n" +
      "- ЗАЯВКИ, СОСТАВЛЕННЫЕ С НАРУШЕНИЕМ ДАННОЙ ФОРМЫ, ПРИНИМАТЬСЯ НЕ БУДУТ\n",
  },
  {
    question:
      "Как можно прикрепить дополнительный номер телефона арендатора для доступа к приложению Домиленд?",
    requestText:
      "Как можно прикрепить дополнительный номер телефона арендатора для доступа к этой программе, чтобы она, например, оставляла заявки на пропуск гостей и доставку?",
    answer:
      "Для добавления пользователя в мобильное приложение, нужно выбрать раздел 'Дом' в нижней части экрана, далее выбрать раздел 'Люди', нажать на кнопку '+', и ввести данные арендатора (ФИО, номер телефона, роль).",
  },
  {
    question: "Почему показания счетчиков не отправляются автоматически?",
    requestText:
      "Добрый день. 23.12.24 поменяли счётчик отопления. В январе показания внесли вручную. Здесь в обращении отвечали, что нужно будет 1 раз внести, и дальше будут показания передаваться автоматически. Сейчас март, а в приложении указано, что показания счётчика отопления последний раз были внесены в январе. Получается, что автоматически не отправились показания за февраль? Как теперь будут начисления? Как сделать, чтобы показания передавались автоматически?",
    answer:
      "Доступ в личный кабинет для передачи показаний по счетчикам — это дополнительная опция в работе приложения от управляющей компании. Ее можно включить в настройках приложения: вкладка 'дом' → 'настройки' → 'показания счетчиков'.",
  },
  {
    question: "Как осуществить поверку счетчиков электроэнергии?",
    requestText:
      "Обращается собственник, просит уточнить, как осуществить поверку счетчиков электроэнергии. Нужна обратная связь.",
    answer:
      "Для замены требуется приобрести счетчик Меркурий 230 ART-01 СN, Трёхфазный, Многотарифный, 3x230/400В, 5 (60)А 50 Гц, Интерфейсы: CAN, RS-485. Стоимость замены без стоимости счетчика составляет 4620 руб. После приобретения счетчика создайте заявку в ЛК с указанием, что приобрели счетчик и требуется его замена. После оплаты счета в ЛК с вами свяжется техник и согласует время работы.",
  },
  {
    question: "Какая длительность гарантии на сантехнические работы?",
    requestText:
      "Обращается собственник, хочет уточнить, какая длительность гарантии на сантехнические работы мастера в его квартире. Нужна обратная связь.",
    answer: "Гарантия на сантехнические работы составляет 3 месяца.",
  },
]

export const QAOrdersKnowledgeBase = () => {
  // Функция-заглушка для обработки редактирования
  const handleEdit = (index: number) => {
    console.log("Редактирование записи:", index)
  }

  // Функция-заглушка для обработки удаления
  const handleDelete = (index: number) => {
    console.log("Удаление записи:", index)
  }

  return (
    <Page>
      <PageHeading>База знаний</PageHeading>

      <Box overflowX="auto">
        <TableContainer>
          <Table variant="simple" size="md">
            <Thead>
              <Tr>
                <Th width="25%">Пример текста заявки</Th>
                <Th width="25%">Вопрос жителя</Th>
                <Th width="35%">Ответ</Th>
                <Th width="15%" textAlign="center">
                  Действия
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {knowledgeBaseData.map((item, index) => (
                <Tr key={index}>
                  <Td whiteSpace="normal" py={4}>
                    {item.requestText}
                  </Td>
                  <Td whiteSpace="normal" py={4}>
                    {item.question}
                  </Td>
                  <Td whiteSpace="normal" py={4}>
                    {item.answer}
                  </Td>
                  <Td textAlign="center">
                    <HStack spacing={2} justifyContent="center">
                      <IconButton
                        aria-label="Редактировать"
                        icon={<FiEdit />}
                        size="sm"
                        colorScheme="blue"
                        onClick={() => handleEdit(index)}
                      />
                      <IconButton
                        aria-label="Удалить"
                        icon={<FiTrash2 />}
                        size="sm"
                        colorScheme="red"
                        onClick={() => handleDelete(index)}
                      />
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Page>
  )
}
