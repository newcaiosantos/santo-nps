import React, { useEffect, useState } from 'react'
import {
    useParams
} from "react-router-dom"
import { useHistory } from "react-router-dom"
import Button from '@material-ui/core/Button'

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
            .add({ score, survey: `/survey/${id}` })
            .then(({ id }) => history.push(`/survey/${id}/tks`))
            .catch(console.log)
    }

    return (
        <div>
            <h2 className="line-height-3">Em uma escala de 0 a 10, o quanto você indicaria <strong>{survey?.target || '...'}</strong> para um amigo?</h2>
            <div className="margin-top nps-answer-grid">
                <Button variant="contained" size="small" onClick={() => addAnswer(0)}>0</Button>
                <Button variant="contained" size="small" onClick={() => addAnswer(1)}>1</Button>
                <Button variant="contained" size="small" onClick={() => addAnswer(2)}>2</Button>
                <Button variant="contained" size="small" onClick={() => addAnswer(3)}>3</Button>
                <Button variant="contained" size="small" onClick={() => addAnswer(4)}>4</Button>
                <Button variant="contained" size="small" onClick={() => addAnswer(5)}>5</Button>
                <Button variant="contained" size="small" onClick={() => addAnswer(6)}>6</Button>
                <Button variant="contained" size="small" onClick={() => addAnswer(7)}>7</Button>
                <Button variant="contained" size="small" onClick={() => addAnswer(8)}>8</Button>
                <Button variant="contained" size="small" onClick={() => addAnswer(9)}>9</Button>
                <Button variant="contained" size="small" onClick={() => addAnswer(10)}>10</Button>
            </div>
        </div>
    )
}

export default Answer