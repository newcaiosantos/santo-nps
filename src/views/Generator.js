import React, { useState } from 'react'
import { useHistory } from "react-router-dom"

export default function Generator() {

    const history = useHistory()
    const [question, setQuestion] = useState('')

    const addSurvey = e => {
        e.preventDefault()
        window
            .firebase
            .firestore()
            .collection("survey")
            .add({ question })
            .then(({ id }) => history.push(`/survey/${id}`))
            .catch(console.log)
    }

    return (
        <div>
            <h1>Santo NPS</h1>
            <label>Defina a pergunta</label>
            <form onSubmit={addSurvey}>
                <input
                    type="text"
                    name="question"
                    placeholder="Em uma escala de 0 a 10, o quanto você indicaria nossa empresa para um amigo?"
                    onChange={e => setQuestion(e.target.value)}
                    value={question}
                />
                <button type="submit">Gerar Pesquisa NPS</button>
            </form>
        </div>
    )
}