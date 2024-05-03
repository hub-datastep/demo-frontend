import { Button, Card, CardBody, CardHeader, Flex, FormControl, FormLabel, Input, Text } from "@chakra-ui/react"
import Logo from "component/Logo"
import { ChangeEvent, FC, FormEvent, useState } from "react"

interface IAuth {
  signIn: (email: string, password: string) => void;
}

const Auth: FC<IAuth> = ({ signIn }) => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        signIn(email, password)
    }

    return (
        <Flex
            h="100vh"
            backgroundColor="gray.300"
            justifyContent="center"
            alignItems="center"
        >
            <Card 
                maxW="sm"
                p={5}
                borderRadius={20}
            >
                <CardHeader>
                    <Logo isDark />
                </CardHeader>
                
                <CardBody
                >
                    <form
                        onSubmit={handleSubmit}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 20,
                        }}
                    >
                        <FormControl isRequired>
                            <FormLabel>
                                <Text as="b">Логин</Text>
                            </FormLabel>
                            <Input type="text" value={email} onChange={handleEmailChange} />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>
                                <Text as="b">Пароль</Text>
                            </FormLabel>
                            <Input type="password" value={password} onChange={handlePasswordChange} />
                        </FormControl>

                        <Button colorScheme="purple" type="submit">Войти</Button>
                    </form>
                </CardBody>
            </Card>
        </Flex>
    )
}

export default Auth
