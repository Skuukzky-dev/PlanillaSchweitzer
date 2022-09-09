import React from 'react'
import styles from "../styles/DatosAlumno.module.css"

const DatosAlumno = (props) => {
    const alumno = props.alumno;
    const establecimiento = alumno.Calificacion[0].DescripcionEstablecimiento;
    const division = alumno.Calificacion[0].DescripcionDivision;
    const cicloLectivo = alumno.Calificacion[0].DescripcionCiclo;

    return (
        <article className={styles.article}>
            <h5 className={styles.h5}>Alumno: ({alumno.Legajo}) {alumno.Apellido}, {alumno.Nombre}</h5>
            <p className={styles.p}>Establecimiento: {establecimiento}</p>
            <p className={styles.p}>Ciclo Lectivo: {cicloLectivo}</p>
            <p className={styles.p}>Division: {division}</p>
        </article>
    );
}

export default DatosAlumno