import React, { useEffect, useState } from 'react'
import {
    useParams
} from "react-router-dom"
import { useHistory } from "react-router-dom"

const Answer = () => {

    let { id } = useParams()
    const [survey, setSurvey] = useState({})

    const history = useHistory()

    const collection = (collectionId) => window.firebase.firestore().collection(collectionId)

    useEffect(() => {

        const getSurvey = () => {
            collection('survey').doc(id).get().then(doc => {
                if (!doc.exists) return console.log('unknown survey')
                const survey = { id: doc.id, ...doc.data() }
                console.log('survey:', survey)
                setSurvey(survey)
            })
        }

        getSurvey()
    }, [id])

    const addAnswer = score => {
        window
            .firebase
            .firestore()
            .collection("answer")
            .add({ score, survey:`/survey/${id}` })
            .then(({ id }) => history.push(`/survey/${id}/tks`))
            .catch(console.log)
    }

    return (
        <div>
            <h2>Pesquisa NPS</h2>
            <h3>{survey?.question}</h3>
            <button onClick={() => addAnswer(1)}>1</button>
            <button onClick={() => addAnswer(2)}>2</button>
            <button onClick={() => addAnswer(3)}>3</button>
            <button onClick={() => addAnswer(4)}>4</button>
            <button onClick={() => addAnswer(5)}>5</button>
            <button onClick={() => addAnswer(6)}>6</button>
            <button onClick={() => addAnswer(7)}>7</button>
            <button onClick={() => addAnswer(8)}>8</button>
            <button onClick={() => addAnswer(9)}>9</button>
            <button onClick={() => addAnswer(10)}>10</button>
        </div>
    )
}

export default Answer