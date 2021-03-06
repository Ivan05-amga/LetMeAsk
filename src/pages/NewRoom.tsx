import {Link, useHistory} from "react-router-dom";
import {FormEvent, useState} from "react";

import ilustrarionImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import logoImgDark from "../assets/images/logo-darkmode.svg";


import "../styles/auth.scss";
import { Button } from "../components/Button";
import { useAuth } from "../hooks/useAuth";
import { database } from "../services/firebase";
import { useTheme } from "../hooks/useTheme";


export function NewRoom(){

    const {user} = useAuth(); 
    const history = useHistory();
    const [newRoom,setNewRoom] = useState("");
    const {theme} = useTheme()

    async function handleCreateRoom(event:FormEvent){
        event.preventDefault();
        
        if(newRoom.trim() === ""){
            return;
        }

        const roomRef = database.ref("rooms");

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
        });

        history.push(`/rooms/${firebaseRoom.key}`)
    }

    return (
        <div id="page-auth">
            <aside> 
                <img src={ilustrarionImg} alt="" />
                <strong>Crie salas de Q&amp;A ao vivo</strong>
                <p>
                    Tire as dúvidas da sua audiência em tempo-real
                </p>
            </aside>
            <main>
                <div className={`main-content ${theme}`}>
                    <img src={theme === "light" ? logoImg : logoImgDark}  alt="Letmeask logo"/>
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input 
                        type="text" 
                        name="" 
                        value={newRoom}
                        onChange={event => setNewRoom(event.target.value)}
                        placeholder="Nomde da sala"
                        />
                        <Button type="submit">
                          Criar Sala  
                        </Button>
                    </form>
                    <p>
                        Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>
                    </p>
                </div>
            </main>
        </div>
    )
}

/*Pesquisar o que é  aside*/