//import { useNavigate } from 'react-router-dom';
import { useCallback, useMemo, useState } from "react"
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { getBodyPart } from "./bodyParts"
import style from "./BodyMap.module.css"
import  Result  from "../result/Result"

// eslint-disable-next-line
const BodyContainer = ({ children }) => (
    <div style={{
        width: "207px",
        height: "500px",
        margin: "30px auto"
    }}>
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 375.42 832.97"
        >
            <g>
                {children}
            </g>
        </svg>
    </div>
)

// eslint-disable-next-line
const BodyPart = ({ id, d, fill, onClick, onMouseEnter, onMouseLeave }) => {
    const handleClick = () => {
        onClick(id)
    }

    const handleMouseEnter = () => {
        onMouseEnter(id)
    }

    const handleMouseLeave = () => {
        onMouseLeave(id)
    }

    return (
        <path
            d={d}
            id={id}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={Object.assign({}, {
                WebkitTapHighlightColor: "transparent",
                cursor: "pointer"
            }, { fill })}
        />
    )
}

export const BodyMap = () => {
    const [lang] = useState("en")
    const [clicked, setClicked] = useState(null)
    const [hovered, setHovered] = useState(null)
    const [result, setResult] = useState(false)
    const [payload, setPayload] = useState()

    const [isModalOpen, setModalOpen] = useState(false)
    //const navigate = useNavigate();
    const antBodyParts = useMemo(() => {
        return getBodyPart(lang).filter(({ face }) => face === "ant")
    }, [lang]) 

    const postBodyPart = useMemo(() => {
        return getBodyPart(lang).filter(({ face }) => face === "post")
    }, [lang]) 

    const clickedName = useMemo(() => {
        if (!clicked) return ""
        return getBodyPart(lang).find(d => clicked === d.id)?.name || ""
    }, [lang, clicked])

    const getFill = useCallback((bodyPartId) => {
        if (clicked === bodyPartId) return "rgb(255, 59, 48)"
        if (hovered === bodyPartId) return "rgb(85, 85, 87)"
        return "rgb(75, 75, 77)"
    }, [clicked, hovered])

    // const handleChangeLang = (e) => {
    //     setLang(e.target.value)
    // }

    const handleClick = (id) => {
        setClicked(id)
    }

    const handleMouseEnter = (id) => {
        if ("ontouchstart" in window) return
        setHovered(id)
    }

    const handleMouseLeave = () => {
        if ("ontouchstart" in window) return
        setHovered(null)
    }

    const handleDiagnosis = () => {
        console.log(clickedName)
        setModalOpen(true)
        //setResult(true)
        //navigate('/result')
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e)
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        console.log(clickedName, formJson)
        setPayload({
            bodyPart:clickedName,
            symptoms:formJson.content
        })
        setResult(true)
        //navigate('/result')
    }
    const handleCancel = (e) => {
        e.preventDefault();
        toggleModal();
        console.log(isModalOpen)
    }
    const toggleModal = () => {
        setModalOpen(!isModalOpen)
    }
    
    return (
        <div className="container">
        {result ? <Result data={payload}/> : 
        <div className="container">
        <div className={style.header}>
            <p></p>
            <button className="btn btn-primary" type="button" onClick={handleDiagnosis}>Start Diagnosis</button>
            <p>Instructions:</p>
            <ul>
            <li>Select the body part where you are experiencing symptoms</li>
            <li>Click on 'Start Diagnosis' button</li>
            <li>Enter the symptom you are experiencing and click on submit</li>
            </ul>
            <Modal show={isModalOpen}>
                <Modal.Header>Enter any symptoms you are having:</Modal.Header>
                <form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <textarea style={{width:'100%'}} name="content"/>
                    </Modal.Body>
                    <Modal.Footer><button className="btn btn-danger" type="button" onClick={handleCancel}>Cancel</button><button className="btn btn-primary" type="submit">Submit Diagnosis</button></Modal.Footer>
                </form>
            </Modal>
        </div>
        
        <div className={style.bodies}>
            <div>
                <p>{txt[lang][1]}</p>
                <BodyContainer>
                    {antBodyParts.map((bodyPart, index) => 
                        <BodyPart
                            key={index}
                            id={bodyPart.id}
                            d={bodyPart.d}
                            fill={getFill(bodyPart.id)}
                            onClick={handleClick} 
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        />
                    )}
                </BodyContainer>
            </div>
            <div>
                <p>{txt[lang][2]}</p>
                <BodyContainer>
                    {postBodyPart.map((bodyPart, index) => 
                        <BodyPart
                            key={index}
                            id={bodyPart.id}
                            d={bodyPart.d}
                            fill={getFill(bodyPart.id)}
                            onClick={handleClick} 
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        />
                    )}
                </BodyContainer>
            </div>
        </div>
        </div>
        }
    </div>)
        
};


const txt = {
    fr: {
        0: "Cliquez sur une partie du corps",
        1: "Face antérieure",
        2: "Face postérieure",
    },
    en: {
        0: "Click on the body!",
        1: "Anterior side",
        2: "Posterior side"
    }
}