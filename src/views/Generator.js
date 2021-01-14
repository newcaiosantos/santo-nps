import React, { useState } from 'react'
import { useHistory } from "react-router-dom"
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'

export default function Generator() {

    const history = useHistory()
    const [target, setTarget] = useState('')

    const addSurvey = e => {
        e.preventDefault()
        window
            .firebase
            .firestore()
            .collection("survey")
            .add({ target })
            .then(({ id }) => history.push(`/survey/${id}`))
            .catch(console.log)
    }

    return (
        <div>
            <h2>SANTO <strong>NPS</strong></h2>
            <p><small>PESQUISAS NPS <strong>RÁPIDAS</strong>!</small></p>

            <div className="margin-top text-left inline-block line-height-24">
                <div>1) Defina o objeto da pesquisa;</div>
                <div>2) Compartilhe o link da pesquisa;</div>
                <div>3) Analise os resultados em tempo real.</div>
            </div>

            <form onSubmit={addSurvey}>

                <div className="margin-top">
                    <TextField onChange={e => setTarget(e.target.value)} label="Objeto da pesquisa" variant="outlined" />
                </div>
                <div className="margin-top">
                    <Paper elevation={3}>
                        <div className="padding text-left">
                            <p><strong>A pergunta ficará assim:</strong></p>
                            <p className="margin-top">Em uma escala de 0 a 10, o quanto você indicaria <strong>{target || '...'}</strong> para um amigo?"</p>
                        </div>
                    </Paper>
                </div>


                <div className="margin-top">
                    <Button type="submit" variant="contained" color="primary">Gerar Pesquisa NPS</Button>
                </div>
            </form>
        </div>
    )
}