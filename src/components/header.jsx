import NuevoPresupuesto from "./nuevopresupuesto"
import ControlPresupuesto from "./ControlPresupuesto"
const Header = ({
  gastos,
  presupuesto,
  setPresupuesto,
  isValid,
  setIsValid,
  setGastos

}) => {
  return (
    <div>
        <header>
            <h1>Control de gastos</h1>
            {isValid ? (
              <ControlPresupuesto
                presupuesto={presupuesto}
                gastos = {gastos}
                setGastos = {setGastos}
                setPresupuesto = { setPresupuesto}
                setIsValid = {setIsValid}
              />
            ) : (
              <NuevoPresupuesto
              presupuesto = {presupuesto}
              setPresupuesto = {setPresupuesto}
              setIsValid={setIsValid}
            />
            )}
           
        </header>

    </div>
  )
}

export default Header