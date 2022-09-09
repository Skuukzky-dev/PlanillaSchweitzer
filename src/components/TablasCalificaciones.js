import React from 'react'
import styles from "../styles/TablasCalificaciones.module.css"
import {useMediaQuery} from '@react-hook/media-query'

const TablasCalificaciones = (props) => {
    const matches = useMediaQuery('only screen and (max-width: 1080px)');
    return(
        <div className={styles.container}>
            {!matches ? 
                (<React.Fragment>
                    <div className={styles.thead}>
                        <span><strong>Fecha</strong></span>
                        <span><strong>Calificacion</strong></span>
                        <span><strong>Tema</strong></span>
                        <span><strong>Subtema</strong></span>
                    </div>
                    {props.tiposEvaluaciones.map((calificaciones,i) => (
                    <div className={styles.tbody} key={i}>
                        <div className={styles.th}><strong>{calificaciones[0].DescripcionTipoEvaluacion}</strong></div>
                        {calificaciones.map((calificacion,i) => (
                        <div className={styles.trow} key={i}>
                            <span>{calificacion.Fecha.slice(0,10).split('-').reverse().join('/')}</span>
                            <span>{calificacion.DescripcionOpcionEscalaCalificacion}</span>
                            <span>{calificacion.Tema}</span>
                            <span>{calificacion.SubTema}</span>
                            {(calificacion.Comentario !== "" &&
                            (<span className={styles.tcomment}>{calificacion.Comentario}</span>))}
                        </div>
                        ))}
                    </div>
                    ))}
                </React.Fragment>)
                :
                props.tiposEvaluaciones.map((calificaciones,i) => (
                <div className={styles.tbody} key={i}>
                    <div className={styles.th}><strong>{calificaciones[0].DescripcionTipoEvaluacion}</strong></div>
                    {calificaciones.map((calificacion,i) => (
                    <div className={styles.trow} key={i}>
                        <span>Fecha</span>
                        <span>{calificacion.Fecha.slice(0,10).split('-').reverse().join('/')}</span>
                        <span>Calificacion</span>
                        <span>{calificacion.DescripcionOpcionEscalaCalificacion}</span>
                        <span>Tema</span>
                        <span>{calificacion.Tema}</span>
                        <span>Subtema</span>
                        <span>{calificacion.SubTema}</span>
                        {(calificacion.Comentario !== "" &&
                        (<span className={styles.tcomment}>{calificacion.Comentario}</span>))}
                    </div>
                    ))}
                </div>
                ))
            }
        </div>
    );
}

export default TablasCalificaciones