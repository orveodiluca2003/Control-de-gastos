import {useState} from "react";
import Mensaje from "./Mensaje";


const NuevoPresupuesto = ({ 
  presupuesto, 
  setPresupuesto, 
  setIsValid
}) => {

  const [mensaje,setMensaje] = useState("")
  const handlePresupuesto = (e) => {
    e.preventDefault()
    if (!presupuesto || presupuesto < 0) {
      setMensaje("ERROR EN EL NÚMERO... Vuelva a introducirlo");
      return
    }else{
      setMensaje('')
    }
    
    setIsValid(true)

  };

  return (
    <div className="contenedor-presupuesto sombra">
      <form onSubmit={handlePresupuesto} className="formulario1">
        <div className="campo">
          <label>Definir nuevo presupuesto</label>
          <input
            className="nuevo-presupuesto"
            type="number"
            placeholder="Añade tu presupuesto."
            value={presupuesto}
            onChange={(e) => setPresupuesto(Number(e.target.value))}
          />
        </div>

        <input type="submit" value="Añadir" />
        {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
      </form>
    </div>
  );
};

export default NuevoPresupuesto;
