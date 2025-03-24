import { ModeT } from "model/UserModel"

export type Route = {
  title: string
  url?: string
  mode?: ModeT
  subRoutes?: Route[]
  isDisabled?: boolean
}

export const configuration = {
  sidebar: {
    routes: [
      //* Assistants
      {
        title: "Ассистенты",
        subRoutes: [
          {
            title: "Базы Данных",
            url: "databases",
            mode: "DB",
          },
          {
            title: "Документы",
            url: "documents",
            mode: "DOCS",
          },
        ],
      },
      //* Classificator
      {
        title: "Классификатор",
        subRoutes: [
          {
            title: "Материалы",
            url: "mapping",
            mode: "CLASSIFIER",
          },
          {
            title: "Работа по Материалу",
            mode: "CLASSIFIER",
          },
          {
            title: "Аварийные Заявки",
            mode: "CLASSIFIER",
          },
        ],
      },
      //* QA бот для жителей
      {
        title: "QA бот для жителей",
        url: "orders_qa",
      },
      //* База знаний QA заявок
      {
        title: "База знаний QA заявок",
        url: "qa-orders-knowledge-base",
      },
      //* Demo
      {
        title: "Демонстрация",
        url: "demo",
      },
    ] as Route[],
  },
}
