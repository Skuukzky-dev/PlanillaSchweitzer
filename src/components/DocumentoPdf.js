import React from 'react';
import TablasCalificaciones from './TablasCalificaciones';
import styles from '../styles/DocumentoPdf.module.css';

const DocumentoPdf = (props) => {
    const alumno = props.alumno;
    const establecimiento = alumno.Calificacion[0].DescripcionEstablecimiento;
    const division = alumno.Calificacion[0].DescripcionDivision;
    const cicloLectivo = alumno.Calificacion[0].DescripcionCiclo;

    return (
        <div className='print'>
            <table>
                <thead><tr><td>
                    <div className={styles.headerSpace}>&nbsp;</div>
                </td></tr></thead>
                <tbody><tr><td>
                    <div className="content">
                    {props.asignaturas.map((tiposEvaluaciones,i) => (
                        <React.Fragment>
                            <h3>{props.nombresAsignaturas[i]} | {props.nombresDocentes[i]}</h3>
                            <TablasCalificaciones
                                tiposEvaluaciones={tiposEvaluaciones}
                            />
                        </React.Fragment>
                    ))}
                    </div>
                </td></tr></tbody>
            </table>
            <div className={styles.header}>
                <article>
                    <p className={styles.left}>({alumno.Legajo}) {alumno.Apellido}, {alumno.Nombre}</p>
                    <p className={styles.right}>{establecimiento}</p>
                </article>
                <article>
                    <p className={styles.left}>{division}</p>
                    <p className={styles.right}>{cicloLectivo}</p>
                </article>
            </div>
        </div>
    );
}

export default DocumentoPdf;