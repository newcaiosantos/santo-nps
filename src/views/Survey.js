import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom"
import {
    useParams
} from "react-router-dom"

const Survey = () => {

    let { id } = useParams()
    const [survey, setSurvey] = useState({})
    const [answers, setAnswers] = useState([])

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

        const getAnswers = () => {
            collection("answer")
                .where("survey", "==", `/survey/${id}`)
                .get()
                .then(function (querySnapshot) {
                    const answers = []
                    querySnapshot.forEach(function (doc) {
                        const answer = { score: doc.data().score }
                        console.log('answer:', answer);
                        answers.push(answer)
                    })
                    setAnswers(answers)
                })
                .catch(console.log)
        }

        getSurvey()
        getAnswers()
    }, [id])

    const nps = (scores) => {

        if (!scores || !scores.length) return 0

        const detractors = scores.filter(it => it < 7)
        const promoters = scores.filter(it => it > 8)

        return ((promoters.length / scores.length) -
            (detractors.length / scores.length)) * 100

    }

    const copyLink = () => {
        navigator.clipboard.writeText(`https://ncs-santonps.web.app/survey/${id}/answer`)
    }

    const goToAnswer = () => {
        history.push(`/survey/${id}/answer`)
    }

    return (
        <div>
            <h2>Pesquisa NPS</h2>
            <h3>{survey?.question}</h3>
            <button onClick={copyLink}>Copiar Link Para Responder</button>
            <button onClick={goToAnswer}>Responder Agora</button>
            <p>Respostas: {answers.length}</p>
            <p>Notas: {answers.map(it=>it.score).join(', ')}</p>
            <p>NPS: {nps(answers.map(it => it.score))}</p>
        </div>
    )
}

export default Survey