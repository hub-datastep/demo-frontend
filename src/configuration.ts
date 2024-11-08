export type Route = {
  title: string
  url?: string
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
          },
          {
            title: "Документы",
            url: "documents",
          },
        ],
      },
      //* Classificator
      {
        title: "Классификатор",
        subRoutes: [
          {
            title: "Материалы",
            url: "classifier",
          },
          {
            title: "Работа по Материалу",
          },
          {
            title: "Аварийные Заявки",
          },
        ],
      },
      {
        title: "Демонстрация",
        url: "demo",
      },
    ] as Route[],
  },
}
