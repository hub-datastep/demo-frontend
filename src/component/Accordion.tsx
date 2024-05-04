import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import { ReactElement } from "react"

interface IAccordion {
    titles: string[]
    panels: ReactElement[]
}

const Accordion = ({ titles, panels }: IAccordion) => {
    if (titles.length !== panels.length) {
        throw Error("Length of the title and panels aren't identical in Accordion component")
    }

    return (
        <Tabs>
            <TabList>
                {titles.map((title) => (
                    <Tab>{title}</Tab>
                ))}
            </TabList>

            <TabPanels>
                {panels.map((panelContent) => (
                    <TabPanel>
                        {panelContent}
                    </TabPanel>
                ))}
            </TabPanels>
        </Tabs>
    )
}

export default Accordion
