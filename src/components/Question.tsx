import "../styles/question.scss";
import {ReactNode} from "react";

type QuestionProps = {
    content : string;
    author: {
        name: string;
        avatar: string;
    }   
    children?: ReactNode; 
    isAnswerd?: boolean;
    isHighlighted?: boolean; 
}


export function Question({content, author,children,isAnswerd = false,isHighlighted = false}:QuestionProps){
    console.log(isAnswerd)
    return (
        <div className={`question ${isAnswerd ? "answerd" : ''} ${isHighlighted && !isAnswerd ? "highlighted" : ""}`}>
            <p>{content}</p>
            <footer>
                <div className="user-info">
                    <img src={author.avatar} alt={author.name} />
                    <span>{author.name}</span>
                </div>
                <div>
                    {children}
                </div>
            </footer>
        </div>
    );
}