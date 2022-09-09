import React, { useEffect, useState } from 'react';
import DatosAlumno from './components/DatosAlumno';
import TablasCalificaciones from './components/TablasCalificaciones';
import IngresoDatosAcceso from './components/IngresoDatosAcceso';
import SeleccionAsignatura from './components/SeleccionAsignatura';
import DocumentoPDf from './components/DocumentoPdf'
import './App.css';
import styles from './styles/App.module.css'
import { useMediaQuery } from '@react-hook/media-query';

export const App = () => {
  const [apiExito, setApiExito] = useState(false);
  const [alumno, setAlumno] = useState(null);
  const [documento, setDocumento] = useState("");
  const [legajo, setLegajo] = useState("");
  const [asignaturas, setAsignaturas] = useState([]);
  const [nombresAsignaturas, setNombresAsignaturas] = useState([]);
  const [nombresDocentes, setNombresDocentes] = useState([]);
  const [asignaturaSeleccionada, setAsignaturaSeleccionada] = useState(0);
  const [valueButton, setValueButton] = useState("Buscar");
  const [consulta, setConsulta] = useState(false);
  const [isDisabledButton, setIsDisableButton] = useState(false);
  const [isDisabledTextFields, setIsDisableTextFields] = useState(false);
  const [isPrinting,setIsPrinting] = useState(false);
  const tiposEvaluaciones = (apiExito) ? asignaturas[asignaturaSeleccionada] : null;
  const matches = useMediaQuery('only screen and (max-width: 1080px)');

  const handleLegajo = (event) => {
    setLegajo(event.target.value);
  }
  const handleDocumento = (event) => {
    setDocumento(event.target.value);
  }
  const handleAsignaturaSeleccionada = (event) => {
    setAsignaturaSeleccionada(event.target.value);
  }
  const handlePDF = () => {
    setIsPrinting(true);
  }
  useEffect(() => {
    if(isPrinting){
      window.print();
      setIsPrinting(false);
    }
  },[isPrinting]);

  const handleDatosAcceso = (event) => {
    event.preventDefault();
    if(consulta){
      setConsulta(false);
      setValueButton("Buscar");
      setIsDisableTextFields(false);
      setLegajo("");
      setDocumento("");
    }
    else {
      setValueButton("Cargando...");
      setIsDisableButton(true);
      setIsDisableTextFields(true);
      let jsonExito = false;
      //const url = 'http://grupoesi.ddns.net:83/api/Calificaciones/' + legajo + '/' + documento + '/';
      const url = 'http://192.168.88.138:83/api/Calificaciones/' + legajo + '/' + documento + '/';
      const authUrl = 'http://192.168.88.22:81/api/login/authenticate';
      let token;

      fetch(authUrl, {
        method: 'POST',
        body: JSON.stringify({Username:"gesi",Password:"18h02"})
      })
          .then(res => res.json())
          .then((data) => {
            jsonExito = true;
            if(data.Success){
              token = data.Token;
            }
            else {
              console.log(data.Error.Code + ": " + data.Error.Message);
              alert(data.Error.Message);
            }
          })
          .catch(() => {
            if(!jsonExito){
              console.log("AUTENTICADOR Fallo al conectar con el servidor");
              alert("AUTENTICADOR Fallo al conectar con el servidor");
            }
          });

      jsonExito = false;

      fetch(url, {
        method: "GET",
        headers: {
          "Authorization": token,
        }/* ,
        timeout: 5000 */
      })
          .then(res => res.json())
          .then((data) => {
            jsonExito = true;
            if(data.Success){
              const alumnoAux = data.Response.Data[data.Response.Data.length - 1];
              const asignaturasAux = organizarAsignaturas(alumnoAux.Calificacion);
              const nombresAsignaturasAux = asignaturasAux.map(asignatura => (asignatura[0][0].DescripcionAsignatura));
              const nombresDocentesAux = asignaturasAux.map(asignatura => (asignatura[0][0].DocenteTitular))
              setAlumno(alumnoAux);
              setAsignaturas(asignaturasAux);
              setNombresAsignaturas(nombresAsignaturasAux);
              setNombresDocentes(nombresDocentesAux);
              setApiExito(true);
              setValueButton("Nueva Búsqueda");
              setConsulta(true);
              setIsDisableButton(false);
            }
            else {
              console.log(data.Error.Code + ": " + data.Error.Message);
              alert(data.Error.Message);
              setValueButton("Buscar");
              setLegajo("");
              setDocumento("");
              setIsDisableButton(false);
              setIsDisableTextFields(false);
            }
          })
          .catch(() => {
            if(!jsonExito){
              console.log("Fallo al conectar con el servidor");
              alert("Fallo al conectar con el servidor");
            }
            setValueButton("Buscar");
            setLegajo("");
            setDocumento("");
            setIsDisableButton(false);
            setIsDisableTextFields(false);
          });
    }
  };
  
  const organizarAsignaturas = (items) => {
    let asignaturas = [];
    items.map((item) => {
        let tiposEvaluaciones = [];
        let calificaciones = [];
        
        let i = 0;

        while(i < asignaturas.length && asignaturas[i][0][0].DescripcionAsignatura !== item.DescripcionAsignatura){
            i++;
        }
        if(i >= asignaturas.length){
            calificaciones.push(item);
            tiposEvaluaciones.push(calificaciones);
            asignaturas.push(tiposEvaluaciones);
        }
        else if(asignaturas[i][0][0].DescripcionAsignatura === item.DescripcionAsignatura) {
            let j = 0;
            while(j < asignaturas[i].length && asignaturas[i][j][0].DescripcionTipoEvaluacion !== item.DescripcionTipoEvaluacion){
                j++;
            }
            if(j >= asignaturas[i].length){
                calificaciones.push(item);
                asignaturas[i].push(calificaciones);
            }
            else if(asignaturas[i][j][0].DescripcionTipoEvaluacion === item.DescripcionTipoEvaluacion){
                asignaturas[i][j].push(item);
            }
        }
        return null;
    });
    return asignaturas;
  };

  return (
    <React.Fragment>
      <div className='no-print'>
        <main className={styles.main}>
          <header className={styles.header}>
            <img className={styles.logo} src='/logoColegio.png' alt='Logo Schweitzer'/>
            <h1 className={styles.h1}>Colegio Schweitzer</h1>
            <h3 className={styles.h3}>Consulta de calificaciones</h3>
          </header>
          <IngresoDatosAcceso 
            handleLegajo={handleLegajo}
            handleDocumento={handleDocumento}
            handleDatosAcceso={handleDatosAcceso}
            valueButton={valueButton}
            documento={documento}
            legajo={legajo}
            isDisabledButton={!(legajo && documento) ? true : isDisabledButton}
            isDisabledTextFields={isDisabledTextFields}
          />
          {apiExito && consulta &&
            <>
              <div className={styles.container}>
                <DatosAlumno alumno={alumno} />
                {!matches && (
                  <button className={styles.button} onClick={handlePDF} type="submit">
                    <img className={styles.img} src="/printer.png" alt="" />
                  </button>
                )}
              </div>
              <SeleccionAsignatura 
                asignaturaSeleccionada={asignaturaSeleccionada}
                handleAsignaturaSeleccionada={handleAsignaturaSeleccionada} 
                nombresAsignaturas={nombresAsignaturas}
                nombresDocentes={nombresDocentes}
              />
              <TablasCalificaciones
                tiposEvaluaciones={tiposEvaluaciones} 
              />
            </>
          }
        </main>
        <footer>©2022 Grupo ESI</footer>
      </div>
      {isPrinting && <DocumentoPDf 
        alumno={alumno}
        asignaturas={asignaturas}
        nombresAsignaturas={nombresAsignaturas}
        nombresDocentes={nombresDocentes}
      />}
    </React.Fragment>
  );
}

export default App;