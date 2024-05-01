import { Center, Container, FormControl, FormLabel, Grid, Input } from "@chakra-ui/react"
import { ChangeEvent, FC, FormEvent, useState } from "react"

interface IAuth {
    signIn: (email: string, password: string) => void,
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
            <Container maxW="lg" flexGrow="1">
                <Center></Center>
                <form onSubmit={handleSubmit}>
                    <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input type="text" value={email} onChange={handleEmailChange} />
                        <Input type="password" value={password} onChange={handlePasswordChange} />
                        <Input type="submit" />
                    </FormControl>
                </form>
            </Container>
        </Grid>
    )
}

export default Auth