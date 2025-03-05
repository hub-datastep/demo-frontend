import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Input,
  Text,
  useDisclosure,
} from "@chakra-ui/react"
import { getSimilarNomenclatures } from "api/mapping/similarNomenclatures"
import { NSINomenclatureCard } from "component/mapping/result/NSINomenclatureCard"
import { LoadingPage } from "component/page/LoadingPage"
import { NSIGroupSelect } from "component/select/NSIGroupSelect"
import { ChangeEvent, FC, useEffect, useState } from "react"
import { SimilarNomenclature } from "type/mapping/similarNomenclature"
import { ModalProps } from "type/modalProps"
import { WithStrId } from "type/withId"

interface NSIViewerProps extends ModalProps {
  prevGroup?: WithStrId<SimilarNomenclature>
  onNomenclatureSelect: (selectedNomenclature: WithStrId<SimilarNomenclature>) => void
}

const NOMS_PER_PAGE_LIMIT = 20

const NOMENCLATURE_NOT_FOUND_VARIANT: WithStrId<SimilarNomenclature> = {
  id: "-1",
  name: "В НСИ нет подходящего варианта",
  material_code: null,
}

export const NSIViewer: FC<NSIViewerProps> = (props) => {
  const { isOpen, onClose, prevGroup, onNomenclatureSelect } = props

  const [inputNomenclatureName, setInputNomenclatureName] = useState<string>("")

  const [nomenclatures, setNomenclatures] = useState<WithStrId<SimilarNomenclature>[]>([])
  const [nsiGroup, setNSIGroup] = useState<WithStrId<SimilarNomenclature>>()

  const isNomsInNSIFound = !!nomenclatures && nomenclatures.length > 0

  const [page, setPage] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [hasMore, setHasMore] = useState<boolean>(true)

  const handleNomenclatureNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputNomenclatureName(value)
  }

  const handleOptionsLoad = async (reset: boolean = false) => {
    if (reset) {
      setPage(1)
      setNomenclatures([])
    }

    setIsLoading(true)

    const similarNomsList = await getSimilarNomenclatures({
      name: inputNomenclatureName,
      group: nsiGroup?.name,
      limit: NOMS_PER_PAGE_LIMIT,
      offset: (page - 1) * NOMS_PER_PAGE_LIMIT,
    })
    setNomenclatures((prevNoms) => [...prevNoms, ...(similarNomsList || [])])

    setHasMore(similarNomsList.length > 0)
    setIsLoading(false)
  }

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const bottom =
      e.currentTarget.scrollHeight ===
      e.currentTarget.scrollTop + e.currentTarget.clientHeight

    if (bottom && hasMore && !isLoading) {
      setPage((prev) => prev + 1)
      handleOptionsLoad()
    }
  }

  // Refetch on input change
  useEffect(
    () => {
      if (inputNomenclatureName) {
        handleOptionsLoad(true)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [inputNomenclatureName, nsiGroup],
  )

  // First-fetch
  useEffect(
    () => {
      setInputNomenclatureName("")
      handleOptionsLoad(true)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [nsiGroup],
  )

  useEffect(() => {
    setInputNomenclatureName("")
  }, [isOpen])

  return (
    <Drawer size="lg" placement="right" isOpen={isOpen} onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>Выберите номенклатуру из НСИ</DrawerHeader>
        <DrawerCloseButton />

        <DrawerBody overflowY="hidden">
          <Flex h="full" w="full" direction="column" gap={5}>
            <Flex w="full" direction="column" gap={2}>
              {/* Name Input */}
              <Input
                placeholder="Введите номенклатуру"
                value={inputNomenclatureName}
                py={2}
                onChange={handleNomenclatureNameChange}
              />

              {/* Group Select */}
              <NSIGroupSelect
                prevGroup={prevGroup}
                selectedGroup={nsiGroup}
                onSelect={setNSIGroup}
              />
            </Flex>

            <Flex
              w="full"
              direction="column"
              onScroll={handleScroll}
              overflowY="auto"
              gap={3}
            >
              {/* Not Found in NSI */}
              <NSINomenclatureCard
                nomenclature={NOMENCLATURE_NOT_FOUND_VARIANT}
                onClick={onNomenclatureSelect}
                onClose={onClose}
              />

              {/* Found NSI Nomenclatures */}
              {nomenclatures.map((nomenclature, index) => (
                <NSINomenclatureCard
                  key={index}
                  nomenclature={nomenclature}
                  onClick={onNomenclatureSelect}
                  onClose={onClose}
                />
              ))}

              {!isLoading && !isNomsInNSIFound && (
                <Flex
                  h="full"
                  w="full"
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Text color="gray">Нет результатов</Text>
                </Flex>
              )}
            </Flex>
          </Flex>
        </DrawerBody>

        <DrawerFooter>{isLoading && <LoadingPage />}</DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export const useNSIViewerDisclosure = () => {
  const {
    isOpen: isNSIViewerOpen,
    onOpen: onNSIViewerOpen,
    onClose: onNSIViewerClose,
  } = useDisclosure()

  return {
    isNSIViewerOpen,
    onNSIViewerOpen,
    onNSIViewerClose,
  }
}
