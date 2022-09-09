import React from "react";
import styles from "../styles/IngresoDatosAcceso.module.css"

const IngresoDatosAcceso = (props) => {
    return (
        <form className={styles.form} onSubmit={(event) => props.handleDatosAcceso(event)}>
            <input 
                value={props.legajo} 
                type="number" 
                disabled={props.isDisabledTextFields}
                placeholder="Legajo" 
                onChange={(event) => props.handleLegajo(event)} 
                required
            />
            <input 
                value={props.documento} 
                disabled={props.isDisabledTextFields} 
                placeholder="Documento" 
                type="number" 
                onChange={(event) => props.handleDocumento(event)} 
                required
            />
            <input 
                type="submit" 
                value={props.valueButton} 
                disabled={props.isDisabledButton}
            />
        </form>
    )
}

export default IngresoDatosAcceso