// import fs from 'fs';
// require('dotenv').config()

import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import { ButtonSendSticker } from '../src/components/ButtonSendStickers';

const SUPABASE_ANON_KEY = `${process.env.TK}`;
const SUPABASE_URL = `${process.env.LK}`;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// fetch(`${SUPABASE_URL}/rest/v1/messages?select=*`, {
//     headers: {
//         'Content-Type': 'application/json',
//         'apikey': SUPABASE_ANON_KEY,
//         'Authorization': 'Bearer ' + SUPABASE_ANON_KEY,
//     }
// })
//     .then((res) => {
//         return res.json();
//     })
//     .then((response) => {
//         console.log(response);
//     });

function listenRealTime(addMsg) {
    return supabaseClient
        .from('chat')
        .on('*', resp => {
            console.log('Houve uma alteração', resp);
            // addMsg(resp.new);
            if (resp.new) {
                addMsg(resp.new);
            }
        })
        .subscribe();
}

// console.log(dadosSup);

export default function ChatPage() {
    // Sua lógica vai aqui

    const rota = useRouter();
    const username = rota.query.username;
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
    - [X] Vamos usar o onChange, usar o useState (ter if pra caso seja enter para limpar a variável)
    - [X] Lista de mensagens
    */

    React.useEffect(() => {
        supabaseClient
            .from('chat')
            .select('*')
            .order('id', { ascending: false })
            .then(({ data }) => {
                console.log('Dados da consulta: ', data);
                setChat(data);
            });

        listenRealTime((newMsg) => {
            setChat((updateChat) => {
                // console.log('Ação de ADICÃO');

                let chatAtual = newMsg ? [newMsg, ...updateChat] : [...updateChat];

                return [
                    ...chatAtual,
                ];
            });
        });
    }, []);

    function handleNovaMensagem(novaMensagem) {
        const msg = {
            // id: chat.length + 1,
            de: username,
            texto: novaMensagem,
        }

        supabaseClient
            .from('chat')
            .insert([
                // Tem que ser um objeto com os MESMOS CAMPOS que você escreveu no supabase
                msg
            ])
            .then(({ data }) => {
                console.log('Criando mensagem: ', data);
                // setChat([
                //     data[0],
                //     ...chat,
                // ]);
            })
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
                    position: 'absolute', display: 'block', top: '7vh',
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

                    <MessageList mensagens={chat} colors={c} remover={(ident) => {
                        supabaseClient
                            .from('chat')
                            .delete()
                            // .select('*')
                            .order('id', { ascending: false })
                            .match({ 'id': ident })
                            .then(({ data }) => {
                                // filtrando a lista sem a linha (row_db)
                                const newChat = chat.filter((lista) => {
                                    return lista.id != data[0].id;
                                })
                                // console.log(data[0])
                                // definindo a lista alterada com a exclusão
                                setChat(newChat);
                                console.log('deletado')
                            })
                    }} />
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
                        <Box
                            styleSheet={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[`${c}`],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        >
                            <TextField
                                value={mensagem}
                                id={'msgSendoEscrita'}
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
                            {/* 
                                Componente abaixo configurado em outro arquivo
                                a função 'onStickerCLick' fica disponivel para nosso uso,
                                mas a lógica está no arquivo do componente
                            */}
                            <ButtonSendSticker
                                onStickerClick={(sticker) => {
                                    // console.log('Salvando no bd');
                                    handleNovaMensagem(`:sticker:${sticker}`);
                                }}
                                styleSheet={{
                                    borderColor: appConfig.theme.colors.neutrals[`${c}`],
                                    // alignItems: 'center',
                                }}
                            />
                        </Box>
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
                            onClick={function (e) {
                                e.preventDefault();
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
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px', overflow: 'scroll',
            }}
        >
            {props.mensagens.map((msgAtual) => {
                // console.log(msgAtual.id)
                
                return (
                    (msgAtual.texto !== undefined) && (
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
                                display: 'inline-flex',
                                width: '100%',
                            }}
                        >

                            <Box
                                styleSheet={{
                                    marginBottom: '10px',
                                    // marginRight: '0',
                                    width: '100%',
                                }}
                            >
                                <Box
                                    styleSheet={{
                                        marginBottom: '15px',
                                        // width: '70%',
                                    }}
                                // onMouseOver={(event) => {
                                //     setTimeout(() => {
                                //         setShowUser(true);
                                //         console.log(showUser)
                                //     }, 2000);
                                // }}
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


                                <Text >
                                    {msgAtual.texto.startsWith(':sticker:') ? (
                                        <Image src={msgAtual.texto.replace(':sticker:', '')}
                                            styleSheet={{
                                                width: '150px',
                                            }}
                                        />
                                    )
                                        : (
                                            msgAtual.texto
                                        )}
                                </Text>
                            </Box>

                            <Button
                                label="X"
                                fullWidth
                                styleSheet={{
                                    position: 'relative',
                                    display: 'inline-flex', float: 'right',
                                    backgroundColor: appConfig.theme.colors.neutrals[`${props.colors - 100}`],
                                    width: '25px', height: '25px', borderRadius: '25px',
                                }}
                                // onClick button exluirá msg atual
                                onClick={function () {
                                    props.remover(msgAtual.id);
                                    // setNaLista(false);
                                    // console.log('Dados da props: ', props.mensagens.msgAtual);
                                    // console.log('msgAtual.id: -> ', msgAtual.id)
                                }}

                                buttonColors={{
                                    contrastColor: appConfig.theme.colors.neutrals["000"],
                                    mainColor: appConfig.theme.colors.neutrals[500],
                                    mainColorLight: appConfig.theme.colors.neutrals[400],
                                    mainColorStrong: appConfig.theme.colors.neutrals[600],
                                }}
                            />

                        </Box>

                    </Text>
                )
                )
            })}

        </Box>
    )
}