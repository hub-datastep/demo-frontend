import {
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    Input,
    Text
} from "@chakra-ui/react"
import { uploadFile as uploadFileApi } from "api/fileApi"
import queryClient from "api/queryClient"
import { AxiosError } from "axios"
import { FilesList } from "component/FilesHistory/FilesList"
import { FileModel } from "model/FileModel"
import {
    ChangeEvent,
    Dispatch,
    FC,
    SetStateAction,
    useRef,
    useState
} from "react"
import { useMutation } from "react-query"

interface IFilesHistory {
  filesList: FileModel[];
  currentFileIndex: number;
  setCurrentFileIndex: Dispatch<SetStateAction<number>>;
  isOpen: boolean;
  onClose: () => void;
}

const FilesHistory: FC<IFilesHistory> = ({
    filesList,
    currentFileIndex,
    setCurrentFileIndex,
    isOpen,
    onClose,
}) => {
    const [errorMessage, setErrorMessage] = useState<string>("")
    const fileInputRef = useRef<HTMLInputElement | null>(null)

    const filesMutation = useMutation(uploadFileApi, {
        onError: (error: AxiosError) => {
            // @ts-ignore
            setErrorMessage(error.response.data.detail)
        },
    })

    const onUploadFiles = async (files: FileList) => {
        const file = files.item(0)
        await filesMutation.mutateAsync({
            file: file!,
        })
        await queryClient.invalidateQueries("filesList")
    }

    const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files) {
            onUploadFiles(files)
        }
    }

    const isUploadFileBtnLoading = filesMutation.isLoading
 
    const handleUploadFileButtonClick = () => {
        fileInputRef.current?.click()
    }

    return (
        <Drawer onClose={onClose} isOpen={isOpen} size="lg">
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />

                <DrawerHeader>Документы</DrawerHeader>
                
                <DrawerBody 
                    display="flex"
                    flexDirection="column"
                >
                    <FilesList
                        filesList={filesList}
                        currentFileIndex={currentFileIndex}
                        setCurrentFileIndex={setCurrentFileIndex}
                    />

                    <Flex direction="column" alignItems="center" py={2} gap={1}>
                        <Button
                            colorScheme="purple"
                            onClick={handleUploadFileButtonClick}
                            isLoading={isUploadFileBtnLoading}
                            isDisabled={isUploadFileBtnLoading}
                        >
                            Загрузить файл
                        </Button>
                        {filesMutation.isError && <Text color="red">{errorMessage}</Text>}

                        <Input
                            hidden
                            ref={fileInputRef}
                            type="file"
                            accept=".pdf"
                            multiple={false}
                            onChange={handleFileInputChange}
                        />
                    </Flex>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    )
}

export default FilesHistory
