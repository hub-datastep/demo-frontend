import { Button, Center, Container, FormControl, FormLabel, Grid, Input } from "@chakra-ui/react"
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
        <Grid placeItems="center" h="100vh">
            <Container maxW="sm" flexGrow="1" display="flex" flexDirection="column" gap={30}>
                <Center>
                    <Logo />
                </Center>
                <form
                    onSubmit={handleSubmit}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 20,
                    }}
                >
                    <FormControl isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input type="text" value={email} onChange={handleEmailChange} />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Password</FormLabel>
                        <Input type="password" value={password} onChange={handlePasswordChange} />
                    </FormControl>

                    <Button colorScheme="blue" type="submit">Submit</Button>
                </form>
            </Container>
        </Grid>
    )
}

export default Auth
