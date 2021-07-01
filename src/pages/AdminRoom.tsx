//import { useEffect } from "react";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import deleteImg from "../assets/images/delete.svg"; 
import logoImg from "../assets/images/logo.svg";
import checkImg from "../assets/images/check.svg";
import answerImg from "../assets/images/answer.svg";
import logoImgDark from "../assets/images/logo-darkmode.svg";


import {Button} from "../components/Button";
import {RoomCode} from "../components/RoomCode";
import { Question } from "../components/Question";

//import { useAuth } from "../hooks/useAuth";
import { database } from "../services/firebase";
import "../styles/room.scss";
import { useRoom } from "../hooks/useRoom";
import { useTheme } from "../hooks/useTheme";
import { DeleteModal } from "../components/DeleteModal";



type RoomParams = {
    id : string;
}

export function AdminRoom(){
    //const {user} = useAuth();
    const params = useParams<RoomParams>();
    const roomID = params.id;
    const {title,questions} = useRoom(roomID);
    const history = useHistory();
    const {theme} = useTheme(); 
    const [modalOpen, setModalOpen] = useState(false);

    async function handleEndRoom(){
        await database.ref(`rooms/${roomID}`).update({
            endedAt : new Date(),
        });

        history.push("/");
    }

    async function handleDeleteQuestion(questionId:string) {
        await database.ref(`rooms/${roomID}/questions/${questionId}`).remove();
        
    }

    async function handleCheckQuestionAnswered(questionId:string){
        await database.ref(`rooms/${roomID}/questions/${questionId}`).update({
            isAnswered : true,
        });
    }

    async function handleHighlightQuestion(questionId:string){
        await database.ref(`rooms/${roomID}/questions/${questionId}`).update({
            isHighlighted : true,
        });
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">             
                <img src={theme === "light" ? logoImg : logoImgDark}  alt="Letmeask logo"/>
                    <div>
                        <RoomCode code={roomID} />
                        <Button isOutlinded onClick={handleEndRoom}>Encerrar sala</Button>
                    </div>
                </div>
            </header>

            <main className={`content ${theme}`}>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>
                <div className="question-list">
                    {questions.map(question => {
                        return (
                            <Question
                                key={question.id}
                                content={question.content}
                                author={question.author}
                                isAnswerd={question.isAnswered}
                                isHighlighted={question.isHighlighted}
                            >
                
                                {!question.isAnswered &&(
                                    <>
                                        <button
                                            type="button"
                                            onClick={() => handleCheckQuestionAnswered(question.id)}
                                        >
                                            <img src={checkImg} alt="Marcar pergunta como respondida" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleHighlightQuestion(question.id)}
                                        >
                                            <img src={answerImg} alt="Dar destaque a pergunta pergunta" />
                                        </button>
                                    </>
                                )}
                            
                                <button
                                    type="button"
                                    onClick={() => setModalOpen(true)}>
                                    <img src={deleteImg} alt="Remover pergunta" />
                                </button>
                                
                                {modalOpen && (
                                    <DeleteModal 
                                            handleDeleteQuestion={handleDeleteQuestion} 
                                            questionID={question.id} 
                                            setModal={setModalOpen}
                                            openModal={true}
                                    ></DeleteModal>
                                )     
                                }

                            </Question>
                        )
                        }
                    )
                }   
                </div>
            </main>
        </div>
    );
}