import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';

export default function ChatPage() {
    // Sua lógica vai aqui

    const [username, setUsername] = React.useState('ju-c-lopes');
    const [environ, setEnv] = React.useState('light');
    const [colored, setColor] = React.useState('100');
    const [c, setC] = React.useState('700');


    // ./Sua lógica vai aqui

    const [mensagem, setMensagem] = React.useState('');
    const [chat, setChat] = React.useState([]);

    // Usuário
    /*

    - Usuário digita no campo textarea
    - Aperta enter para enviar
    - Tem que adicionar o texto na listagem

    // Dev
    - [X] Campo criado
    - [+/-] Vamos usar o onChange, usar o useState (ter if pra caso seja enter para limpar a variável)
    - [ ] Lista de mensagens

    */

    function handleNovaMensagem(novaMensagem) {
        const msg = {
            id: chat.length + 1,
            de: username,
            texto: novaMensagem,
        }
        setChat([
            msg,
            ...chat,
        ]);
        // console.log(chat)
        setMensagem('');
    }

    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.neutrals[`${colored}`],
                backgroundImage: `url(https://i.imgur.com/tPxs21E.jpg)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Button
                // type='submit'
                label={environ}
                fullWidth
                styleSheet={{
                    position: 'absolute', display: 'block', top: '10vh',
                    alignItems: 'center', justifyContent: 'center',
                    backgroundColor: appConfig.theme.colors.neutrals[`${c}`],
                    width: '15vw', height: '5vh', borderRadius: '25px',
                }}
                // onClick button alterará modo escuro e claro
                onClick={function () {
                    const newEnv = environ === 'light' ? 900 : 100;
                    setEnv(environ === 'light' ? 'dark' : 'light')
                    setColor(newEnv)
                    setC(colored < 200 ? 900 : 700);
                }}

                buttonColors={{
                    contrastColor: appConfig.theme.colors.neutrals["000"],
                    mainColor: appConfig.theme.colors.neutrals[500],
                    mainColorLight: appConfig.theme.colors.neutrals[400],
                    mainColorStrong: appConfig.theme.colors.neutrals[600],
                }}
            />
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[`${c}`],
                    height: '100%',
                    maxWidth: '65%',
                    maxHeight: '65vh',
                    padding: '32px',
                }}
            >

                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[`${c - 100}`],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >

                    <MessageList mensagens={chat} />
                    {/* {chat.map((msgAtual) => {
                        console.log(msgAtual);
                        return(
                            <li key={msgAtual.id}>
                                {msgAtual.de}: {msgAtual.texto}
                            </li>
                        )
                    })} */}
                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={mensagem}
                            onChange={(event) => {
                                const valor = event.target.value;
                                setMensagem(valor);
                            }}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault();

                                    handleNovaMensagem(mensagem);
                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[`${c}`],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                        {/* Botão ppara enviar msg */}
                        <Button
                            // type='submit'
                            label=""
                            fullWidth
                            styleSheet={{
                                position: 'relative', display: 'flex',
                                alignItems: 'center', justifyContent: 'center',
                                padding: '5px 5px 5px 5px',
                                backgroundImage: 'url(https://i.imgur.com/o59uvSk.png)',
                                backgroundRepeat: 'no-repeat', backgroundSize: '15px 15px',
                                backgroundPosition: 'center',
                                backgroundColor: appConfig.theme.colors.neutrals[`${c}`],
                                width: '35px', height: '35px', borderRadius: '25px',
                            }}
                            // onClick button alterará modo escuro e claro
                            onClick={function () {
                                handleNovaMensagem(mensagem);
                            }}

                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.neutrals[500],
                                mainColorLight: appConfig.theme.colors.neutrals[400],
                                mainColorStrong: appConfig.theme.colors.neutrals[600],
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    // console.log(props)
    // console.log('MessageList', props);
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px', overflow: 'hidden',
            }}
        >
            {props.mensagens.map((msgAtual) => {
                console.log(msgAtual)
                return (
                    <Text

                        key={msgAtual.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/${msgAtual.de}.png`}
                            />
                            <Text tag="strong">
                                {msgAtual.de}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>
                        </Box>
                        {msgAtual.texto}
                    </Text>
                );
            })}

        </Box>
    )
}