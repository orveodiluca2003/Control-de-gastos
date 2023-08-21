import { useState, useEffect } from "react";
import Header from "./components/header";
import IconoNuevoGasto from "./img/nuevo-gasto.svg";
import Modal from "./components/Modal";
import { generarId } from "./helpers";
import ListadoGatos from "./components/ListadoGatos";


function App() {
  const [presupuesto, setPresupuesto] = useState(
    localStorage.getItem("presupuesto") ?? 0
  );
  const [isValid, setIsValid] = useState(false);
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);
  const [gastos, setGastos] = useState(
    localStorage.getItem(" gastos ") ? JSON.parse(localStorage.getItem("gastos")) : []
  )
  const [gastoEditar, setgastoEditar] = useState({});


  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setModal(true);
      setTimeout(() => {
        setAnimarModal(true);
      }, 500);
    }
  }, [gastoEditar]);

  const handleNuevoGasto = () => {
    setModal(true);
    setgastoEditar({});
    setTimeout(() => {
      setAnimarModal(true);
    }, 500);
  };

  const nuevoGasto = (gasto) => {
    if(gasto.id){
      //Actualizar Gasto
      const gastoActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastoActualizados)
      setgastoEditar({})
    }else{
      //Nuevo Gasto
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    }
    
    setAnimarModal(false);
    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  const eliminarNuevoGasto = (id) => { 
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id)
    setGastos(gastosActualizados)
  }

  useEffect(() => {
    Number(localStorage.setItem("presupuesto",presupuesto ?? 0))
  },[presupuesto])

  useEffect(() => {
    const presupuestoLs = Number(localStorage.getItem("presupuesto")) ?? 0
    if(presupuestoLs > 0 ){
      setIsValid(true)
    }
  },[])

  useEffect(() => {
    Number(localStorage.setItem("gastos" ,JSON.stringify(gastos) ?? []))
  },[gastos])

  return (
    <>
      <Header
        gastos={gastos}
        setGastos = {setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValid={isValid}
        setIsValid={setIsValid}
      />

      {isValid && (
        <>
          <main>
            <ListadoGatos 
              gastos={gastos} 
              setgastoEditar={setgastoEditar} 
              eliminarNuevoGasto = {eliminarNuevoGasto}
            />
          </main>
          <div className="nuevo-gasto">
            <img
              src={IconoNuevoGasto}
              alt="icono nuevo gasto."
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}

      {modal && (
        <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          nuevoGasto={nuevoGasto}
          gastoEditar={gastoEditar}
          setgastoEditar = {setgastoEditar}
        />
      )}
    </>
  );
}

export default App;
