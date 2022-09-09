import React from "react";
import styles from "../styles/SeleccionAsignatura.module.css";

const SeleccionAsignatura = (props) => {
    return (
        <form className={styles.form}>
            <label className={styles.label} htmlFor="fAsignatura" >Asignatura
                <select name="fAsignatura" defaultValue={props.asignaturaSeleccionada} onChange={event => props.handleAsignaturaSeleccionada(event)} >
                    {props.nombresAsignaturas.map((descripcionAsignatura,i) => (
                        <option key={i} value={i}>{descripcionAsignatura}</option>
                    ))}
                </select>
            </label>
            <span>Docente: {props.nombresDocentes[props.asignaturaSeleccionada]}</span>
        </form>
    );
}

export default SeleccionAsignatura