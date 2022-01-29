import React from 'react';
import { useRouter } from 'next/router';
import { Box, Button,TextField, Text, Image } from '@skynexui/components';
import appConfig from '../config.json';

function Titulo(props) {
    const Tag = props.tag || "h1";
    return (
        <>
            <Tag>{props.children}</Tag>
            <style jsx>{`
                ${Tag} {
                    color: ${appConfig.theme.colors.neutrals['300']};
                    font-size: 40px;
                    font-weight: 600;
                }`}
            </style>
        </>
    );
}

// Componente React
// function HomePage() {
//     // JSX
//     return (
//         <div>
//             <GlobalStyle />
//             <Titulo tag="h1">Boas vindas de volta!</Titulo>
//             <h2>Discord - Alura Matrix</h2>
//         </div>
//     );
// }

// export default HomePage

export default function PaginaInicial() {
    // const username = 'ju-c-lopes';
    const [username, setUsername] = React.useState('');
    const roteamento = useRouter();
    const [environ, setEnv] = React.useState('light');
    const [colored, setColor] = React.useState('100');
    const [c, setC] = React.useState('700');

    return (
        <>
            <Box
                styleSheet={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: appConfig.theme.colors.neutrals[`${colored}`],
                    backgroundImage: 'url(https://i.imgur.com/tPxs21E.jpg)',
                    backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                }}
            >
            <Button
                // type='submit'
                label={environ}
                fullWidth
                styleSheet={{
                    position: 'absolute', display: 'block', top: '7vh', 
                    alignItems: 'center', justifyContent: 'center',
                    backgroundColor: appConfig.theme.colors.neutrals[`${c}`],
                    width: '15vw', height: '5vh', borderRadius: '25px',
                }}
                // onClick button alterará modo escuro e claro
                onClick={ function() {
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
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: {
                        xs: 'column',
                        sm: 'row',
                    },
                    width: '100%', maxWidth: '700px',
                    borderRadius: '5px', padding: '32px', margin: '16px',
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    backgroundColor: appConfig.theme.colors.neutrals[`${c}`],
                }}
                // onChange={ function () {
                    
                //     console.log(c)
                // }}
            >
            {/* Formulário */}
            <Box
                as="form"
                onSubmit={function (InfosDoEvento) {
                    InfosDoEvento.preventDefault();
                    // console.log('Submetido');
                    console.log(InfosDoEvento)

                    // window.location.href = '/chat';

                    roteamento.push(`/chat?username=${username}`);
                }}
                styleSheet={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
                }}
            >
                <Titulo tag="h2">Boas vindas de volta!</Titulo>
                <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
                    {appConfig.name}
                </Text>

                {/* <input 
                    type="text"
                    value={username}
                    onChange={function (event) {
                        console.log('usuário digitou', event.target.value);
                        // Onde tá o valor?
                        const valor = event.target.value;
                        // Trocar o valor da variável
                        setUsername(valor);
                    }}
                /> */}

                <TextField
                    value={username}
                    onChange={function (event) {
                        console.log('usuário digitou', event.target.value);
                        // Onde tá o valor?
                        const valor = event.target.value;
                        // Trocar o valor da variável
                        setUsername(valor);
                    }}
                    fullWidth
                    textFieldColors={{
                        neutral: {
                            textColor: appConfig.theme.colors.neutrals[200],
                            mainColor: appConfig.theme.colors.neutrals[900],
                            mainColorHighlight: appConfig.theme.colors.neutrals[600],
                            backgroundColor: appConfig.theme.colors.neutrals[800],
                        },
                    }}
                />
                <Button
                    type='submit'
                    label='Entrar'
                    fullWidth
                    buttonColors={{
                        contrastColor: appConfig.theme.colors.neutrals["000"],
                        mainColor: appConfig.theme.colors.neutrals[500],
                        mainColorLight: appConfig.theme.colors.neutrals[400],
                        mainColorStrong: appConfig.theme.colors.neutrals[600],
                    }}
                />
            </Box>
                    {/* Formulário */}


                    {/* Photo Area */}
                    <Box
                        styleSheet={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            maxWidth: '200px',
                            padding: '16px',
                            backgroundColor: appConfig.theme.colors.neutrals[800],
                            border: '1px solid',
                            borderColor: appConfig.theme.colors.neutrals[999],
                            borderRadius: '10px',
                            flex: 1,
                            minHeight: '240px',
                        }}
                    >
                        <Image
                            styleSheet={{
                                borderRadius: '50%',
                                marginBottom: '16px',
                            }}
                            src={`https://github.com/${username}.png`}
                        />
                        <Text
                            variant="body4"
                            styleSheet={{
                                color: appConfig.theme.colors.neutrals[200],
                                backgroundColor: appConfig.theme.colors.neutrals[900],
                                padding: '3px 10px',
                                borderRadius: '1000px'
                            }}
                        >
                            {username}
                        </Text>
                    </Box>
                    {/* Photo Area */}
                </Box>
            </Box>
        </>
    );
}