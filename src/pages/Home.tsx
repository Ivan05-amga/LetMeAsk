import {useHistory} from "react-router-dom";

//import { firebase,auth} from "../services/firebase"

import ilustrarionImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleIconImage from "../assets/images/google-icon.svg";
import logoImgDark from "../assets/images/logo-darkmode.svg";

import "../styles/auth.scss";
import { Button } from "../components/Button";
import { useAuth } from "../hooks/useAuth";
import { FormEvent } from "react";
import { useState } from "react";
import { database } from "../services/firebase";
import { useTheme } from "../hooks/useTheme";

export function Home(){
    const history = useHistory();
    const { user,signInWithGoogle } = useAuth();
    const [roomCode,setRoomCode] = useState("");
    const {theme} = useTheme(); 

    async function handleCreateRoom(){
        if (!user){
            await signInWithGoogle();
        }
        history.push("/rooms/new");
    }

    async function handleJoinRoom(event:FormEvent){
        event.preventDefault();

        if (roomCode.trim() === ""){
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if(!roomRef.exists()){
            alert("Room does not exist.");
            return;
        }

        if (roomRef.val().endedAt){
            alert("Room alredy closed.");
            return; 
        }

        history.push(`rooms/${roomCode}`);
    }

    return (
        <div id="page-auth" className={theme}>
            <aside> 
                <img src={ilustrarionImg} alt="" />
                <strong>Crie salas de Q&amp;A ao vivo</strong>
                <p>
                    Tire as dúvidas da sua audiência em tempo-real
                </p>
            </aside>
            <main>
                <div className="main-content">
                <img src={theme === "light" ? logoImg : logoImgDark}  alt="Letmeask logo"/>
                    <div>
                        <button onClick={handleCreateRoom} className="create-room" >
                            <img src={googleIconImage} alt="Logo do google" />
                            Crie sua sala com o Google
                        </button>
                    </div>
                    <div className="separator">ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input 
                        onChange={event => setRoomCode(event.target.value)}
                        value={roomCode}
                        type="text" 
                        placeholder="Digite o código da sala"
                        />
                        <Button type="submit">
                          Entrar na sala  
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}

