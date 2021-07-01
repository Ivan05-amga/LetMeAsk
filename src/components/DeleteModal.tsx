import ReactModal from "react-modal";
import "../styles/deletemodal.scss";
import {Styles} from "react-modal";

const customStyles:Styles = {
  content: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    border: "none",
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    width: "50%",
    height: "50%",
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
  overlay:{
    backgroundColor: 'rgba(54,52,55,0.5)'
  }
};

type CloseRoomModalProps= {
  handleDeleteQuestion: (questionID:string) => void;
  questionID: string;
  setModal: (arg:boolean) => void;
  openModal : boolean;
}

export function DeleteModal({handleDeleteQuestion,questionID,openModal,setModal}:CloseRoomModalProps){
    return (
      <>
          <ReactModal
            isOpen={openModal}
            style={customStyles}
            ariaHideApp={false}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 5.99988H5H21" stroke="#737380" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M8 5.99988V3.99988C8 3.46944 8.21071 2.96074 8.58579 2.58566C8.96086 2.21059 9.46957 1.99988 10 1.99988H14C14.5304 1.99988 15.0391 2.21059 15.4142 2.58566C15.7893 2.96074 16 3.46944 16 3.99988V5.99988M19 5.99988V19.9999C19 20.5303 18.7893 21.039 18.4142 21.4141C18.0391 21.7892 17.5304 21.9999 17 21.9999H7C6.46957 21.9999 5.96086 21.7892 5.58579 21.4141C5.21071 21.039 5 20.5303 5 19.9999V5.99988H19Z" stroke="#e24260" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <h1>Excluir a pergunta</h1>
            <p>Tem certeza que quer excluir essa pergunta?</p>
            <div className="button-container">
              <button className="gray-button" onClick={()=> setModal(false)}>Cancelar</button>
              <button className="red-button" onClick={() => {
                handleDeleteQuestion(questionID)
                setModal(false)
                }}>Sim, excluir</button>
            </div>
          </ReactModal>
      </>
    );
}