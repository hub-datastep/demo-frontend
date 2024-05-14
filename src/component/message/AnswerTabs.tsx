import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"

interface IAnswerTabs {
  titles: string[]
  panels: JSX.Element[]
}

const AnswerTabs = ({ titles, panels }: IAnswerTabs) => {
  if (titles.length !== panels.length) {
    throw Error("Length of the title and panels aren't identical in AnswerTabs component")
  }

  return (
    <Tabs>
      <TabList>
        {titles.map((title, index) => (
          <Tab key={index} fontSize="sm" w="full" px={0} mx={0}>
            {title}
          </Tab>
        ))}
      </TabList>

      <TabPanels>
        {panels.map((panelContent, index) => (
          <TabPanel key={index}>{panelContent}</TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  )
}

export default AnswerTabs
