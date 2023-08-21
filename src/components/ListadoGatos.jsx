import Gasto from "./Gasto"
const ListadoGatos = ({gastos,setgastoEditar,eliminarNuevoGasto}) => {
  return (
    <div className="listado-gastos contenedor">
        <h2>{gastos.length ? "Gastos" : "No hay gastos aún."}</h2>
        {gastos.map(gasto => (
            <Gasto
                key={gasto.id}
                gasto = {gasto}
                setgastoEditar = {setgastoEditar}
                eliminarNuevoGasto = {eliminarNuevoGasto}
            />
        ))}
    </div>
  )
}

export default ListadoGatos