import { Flex, Spinner, Text } from "@chakra-ui/react"
import { FC, useEffect, useState } from "react"

const LOADER_TEXTS = [
  "Анализируем введённые данные",
  "Сверяемся с данными в Вашем файле",
  "ИИ работает во всю",
  "Cобираем таблицу с ответами для Вас",
]

export const LoaderWithTexts: FC = () => {
  const [loadingText, setLoadingText] = useState<string>(LOADER_TEXTS[0])
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % LOADER_TEXTS.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    setLoadingText(LOADER_TEXTS[index])
  }, [index])

  return (
    <Flex direction="row" gap={3}>
      <Spinner size="md" color="purple" />

      <Text>{loadingText}</Text>
    </Flex>
  )
}
