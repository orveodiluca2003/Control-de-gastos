import { formatearFecha } from "../helpers";
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
  } from 'react-swipeable-list';
  import 'react-swipeable-list/dist/styles.css';
import "react-swipeable-list/dist/styles.css"
import Ahorro from "../img/icono_ahorro.svg";
import Casa from "../img/icono_casa.svg";
import Comida from "../img/icono_comida.svg";
import Salud from "../img/icono_salud.svg";
import Ocio from "../img/icono_ocio.svg";
import Suscripciones from "../img/icono_suscripciones.svg";

const diaccionarioIconos = {
  ahorro: Ahorro,
  comida: Comida,
  servicios: Casa,
  ropa: Ocio,
  salud: Salud,
  suscripciones: Suscripciones,
};

const Gasto = ({ gasto,setgastoEditar, eliminarNuevoGasto }) => {
    const { categoria, nombre, cantidad, id, fecha } = gasto;

    const leadingActions = () => {
      return (
        <LeadingActions>
          <SwipeAction onClick={() => {
            setgastoEditar(gasto)
          }}>
            Editar
          </SwipeAction>
        </LeadingActions>
      )
    }

    const trailingActions = () => {
      return(
        <TrailingActions>
          <SwipeAction 
          onClick={() => {
            console.log(eliminarNuevoGasto(id))
          }}
          destructive = {true}>
            Eliminar
          </SwipeAction>
        </TrailingActions>
      )
    }

  return (
    <SwipeableList>
        <SwipeableListItem
          leadingActions = {leadingActions()}
          trailingActions = {trailingActions()}
        >
        <div className="gasto sombra">
          <div className="contenido-gasto">
            <img
              src={diaccionarioIconos[categoria]}
              alt="Icono de la categoria"
            />
            <div className="descripcion-gasto">
              <p className="nombre-gasto">{nombre}</p>
              <p className="categoria-gasto">{categoria}</p>
              <p className="fecha-gasto">
                Agregado el: <span>{formatearFecha(fecha)}</span>
              </p>
            </div>
          </div>
          <p className="cantidad-gasto">{cantidad} $</p>
        </div>
        </SwipeableListItem>
    </SwipeableList>    
  );
};

export default Gasto;
