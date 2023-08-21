import CerrarBtn from "../img/cerrar.svg";
import {useState,useEffect} from "react";
import Mensaje from "./Mensaje";

const Modal = ({ 
  setModal, 
  animarModal, 
  setAnimarModal, 
  nuevoGasto,
  gastoEditar, 
  setgastoEditar
}) => {

  const[mensaje,setMensaje] = useState("")
  const[nombre,setNombre] = useState("")
  const[cantidad,setCantidad] = useState("")
  const[categoria, setCategoria] = useState("")
  const [id,setId] = useState("")
  const [fecha,setFecha] = useState("")

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0){
      setNombre(gastoEditar.nombre)
      setCantidad(gastoEditar.cantidad)
      setCategoria(gastoEditar.categoria)
      setId(gastoEditar.id)
      setFecha(gastoEditar.fecha)
    }
  },[])

  const ocultarModal = () => {
    setAnimarModal(false);
    setgastoEditar({})
    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault()

    if([nombre,cantidad,categoria].includes("")){
      setMensaje("Todos los campos son obligatorios.")
      setTimeout(()=>{
        setMensaje("")
      },3000)
      return
    }

    nuevoGasto({nombre,cantidad,categoria,id,fecha})
  }

  return (
    <div className="modal">
      <div className="modal-boton-cerrar">
        <img src={CerrarBtn} alt="Boton para cerrar" onClick={ocultarModal} />
      </div>

      <form 
        onSubmit={handleSubmit}
        className={`formulario ${animarModal ? "animar" : "cerrar"}`}
      >
        <label>{gastoEditar.nombre ? "Editar gasto" : "Nuevo Gasto"}</label>
        {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

        <div className="campo1">
          <label htmlFor="nombre">Nombre del gasto</label>
          <input
            id="nombre"
            type="text"
            placeholder="Añade el nombre del gasto."
            value={nombre}
            onChange={ e => {
              setNombre(e.target.value)
            }}
          />
        </div>

        <div className="campo2">
          <label htmlFor="cantidad">Cantidad</label>
          <input
            id="cantidad"
            type="number"
            placeholder="Añade la cantidad del gasto."
            value={cantidad}
            onChange={ e => {
              setCantidad(Number(e.target.value))
            }}
          />
        </div>

        <div className="campo3">
          <label htmlFor="categoria">Categoría</label>
          <select id="categoria" value={categoria} onChange={e => {setCategoria(e.target.value)}}>
            <option value="">-- Seleccione --</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="servicios">Servicios</option>
            <option value="ropa">Ropa</option>
            <option value="gastos">Gastos Varios</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">Suscripciones</option>
          </select>
        </div>

        <input
          className="send"
          type="submit"
          value={gastoEditar.nombre ? "Editar" : "Añadir gasto"}
        />

      </form>
    </div>
  );
};

export default Modal;
