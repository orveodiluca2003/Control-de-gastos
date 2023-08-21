import { useState, useEffect } from "react";
import {CircularProgressbar, buildStyles} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css"

const ControlPresupuesto = ({ gastos, presupuesto, setGastos, setPresupuesto, setIsValid }) => {
  const[porcentaje,setPorcentaje] = useState(0)
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);

  useEffect(() => { //este useEffect lo que hace es restar el total disponible y el totalgastado.
    const totalGastado = gastos.reduce((total,gasto) => gasto.cantidad + total,0)
    const totalDisponible = presupuesto - totalGastado

    const nuevoPorcentaje = ((presupuesto - totalDisponible) / presupuesto) * 100

    setDisponible(totalDisponible)
    setGastado(totalGastado)
    setPorcentaje(nuevoPorcentaje)

  },[gastos])

  const formatearMoneda = (e) => {
    return e.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };
  
  const handleResetApp = () => {
    const resultado = confirm("¿Deseas resetear la aplicación? ")
    if(resultado){
      setGastos([])
      setPresupuesto(0)
      setIsValid(false)
    }
  }

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar 
          value={porcentaje}
          styles={buildStyles({
            pathColor: porcentaje > 100 ? "red" : "#96e6a1",
            trailColor: "#fbfcdb",
            textColor : "#330867",
          })}
          text={`${porcentaje}%`}
        
        >
        </CircularProgressbar>
      </div>

      <div className="contenido-presupuesto">
        <button 
        className="reset-app"
        type="button"
        onClick={handleResetApp}
        >
          Resetear App
        </button>
        <p>
          <span>Presupuesto :</span> {formatearMoneda(presupuesto)}
        </p>
        <p className={`${disponible < 0 ? "negativo" : ""}`}>
          <span>Disponible :</span> {formatearMoneda(disponible)}
        </p>
        <p>
          <span>Gastado :</span> {formatearMoneda(gastado)}
        </p>
      </div>
    </div>
  );
};

export default ControlPresupuesto;
