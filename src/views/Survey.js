import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom"
import {
    useParams
} from "react-router-dom"
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import GaugeChart from 'react-gauge-chart'

const Survey = () => {

    let { id } = useParams()
    const [survey, setSurvey] = useState({})
    const [answers, setAnswers] = useState([])
    const [copied, setCopied] = useState(false)
    const [nps, setNps] = useState(0)

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
                .onSnapshot(function (querySnapshot) {
                    const answers = []
                    querySnapshot.forEach(function (doc) {
                        const answer = { score: doc.data().score }
                        console.log('answer:', answer)
                        answers.push(answer)
                    })
                    setAnswers(answers)
                    setNps(calcNps(answers.map(it => it.score)))
                })
        }
        getSurvey()
        getAnswers()
    }, [id])

    const calcNps = (scores) => {
        if (!scores || !scores.length) return 0
        const detractors = scores.filter(it => it < 7)
        const promoters = scores.filter(it => it > 8)
        return ((promoters.length / scores.length) -
            (detractors.length / scores.length)) * 100

    }

    const copySurveyLink = () => {
        navigator.clipboard.writeText(`https://santonps.com/survey/${id}/answer`)
        setCopied(true)
    }

    const copyNPSLink = () => {
        navigator.clipboard.writeText(`https://santonps.com/survey/${id}`)
        setCopied(true)
    }

    const goToAnswer = () => {
        history.push(`/survey/${id}/answer`)
    }

    const handleClickedClose = (event, reason) => {
        if (reason === 'clickaway') return
        setCopied(false)
    }

    return (
        <div>
            <Snackbar
                message="link copiado!"
                open={copied}
                autoHideDuration={2000}
                onClose={handleClickedClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            ></Snackbar>

            <div className="margin-top">
                <GaugeChart
                    percent={(100 + nps) / 200}
                    formatTextValue={value => `NPS ${nps.toFixed(1)}`}
                    textColor="#333"
                    colors={["#DB4437", "#F4B400", "#4285F4", "#0F9D58"]}
                    arcsLength={[50, 17, 17, 16]}

                />
            </div>

            <h2 className="line-height-3">Em uma escala de 0 a 10, o quanto você indicaria <strong>{survey?.target || '...'}</strong> para um amigo?</h2>

            <div className="margin-top">
                <Button onClick={copySurveyLink} variant="contained" color="primary">Compartilhar Pesquisa</Button> &nbsp;
            </div>
            <div className="margin-top">
                <Button onClick={copyNPSLink} variant="contained">Compartilhar NPS</Button> &nbsp;
            </div>
            <div className="margin-top">
                <Button onClick={goToAnswer} variant="contained">Responder</Button>
            </div>
            <div className="margin-top">
                <p><strong>{answers.length}</strong> resposta{answers.length === 1 ? '' : 's'} até o momento...</p>
            </div>

        </div>
    )
}

export default Survey