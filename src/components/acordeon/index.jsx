import { useState } from "react";
import data from "./data";
import "./styles.css";

export default function Acordeon() {
  // Estado para manejar si se abre o se cierra el acordeon
  const [seleccionado, setSeleccionado] = useState(null);

  // Estado para activar o desactivar la seleccion multiple
  const [activarMultiseleccion, setActivarMuiltiseleccion] = useState(false);

  // Estado  que guarda los items que estan seleccionados en modo multiselectivo
  const [multiple, setMultiple] = useState([]);

  // Funcion para  mostrar u ocultar los detalles del acordeon
  function handleSingleSelection(getCurrentId) {
    console.log(getCurrentId);
    //Esta parte se encarga de que si el acordeon seleccionado actualmente ya estaba activado vuelva a ser null para contraerse, en caso contrario el estado sera getCurrentId y se mostrara ese acordeon. getCurrentId pasa a ser el dataItem.id en el evento onclick
    setSeleccionado(getCurrentId === seleccionado ? null : getCurrentId);
  }

  //   Funcion  para agregar y eliminar elementos de la lista de multiples
  function handleMultiSelection(getCurrentId) {
    // copiaMultiple  es una variable temporal que contiene un arreglo con todos los valores de Multiple
    let copiaMultiple = [...multiple];
    // encontrarIndexOfIdActual  retorna -1 si activar multi seleccion esta activo y un numero > 0 si esta desactivado (acorde con el id del item seleccionado)
    const encontrarIndexOfIdActual = copiaMultiple.indexOf(getCurrentId);

    console.log(encontrarIndexOfIdActual);
    //  Si no existe el elemento actual en Multiples y el valor de encontrarIndexOfIdActual es -1 , lo agrego al array copiaMultiple
    if (encontrarIndexOfIdActual === -1) copiaMultiple.push(getCurrentId);
    //  Si el indice es mayor a -1 entonces elimina el elemento de la lista
    else copiaMultiple.splice(encontrarIndexOfIdActual, 1);

    // Se le da a multiple el valor de la copia con los push  y splice.
    setMultiple(copiaMultiple);
  }

  console.log(seleccionado, multiple);

  return (
    <div className="wrapper">
      {/* !activarMultiseleccion hace que con un click eso se vuelva true o false dependiendo del valor actual */}
      <button onClick={() => setActivarMuiltiseleccion(!activarMultiseleccion)}>
        Activar Multi-seleccion
      </button>
      <div className="acordeon">
        {data && data.length > 0 ? (
          data.map((dataItem) => (
            <div className="item" key={dataItem.id}>
              <div
                onClick={
                  // Si activarMultiSeleccion es true,  se ejecuta la funcion handleMultiSelection si no handleSingleSelection
                  activarMultiseleccion
                    ? () => handleMultiSelection(dataItem.id)
                    : () => handleSingleSelection(dataItem.id)
                }
                className="titulo"
              >
                <h3>{dataItem.question}</h3>
                <span>+</span>
              </div>
              {activarMultiseleccion
                ? multiple.indexOf(dataItem.id) !== -1 && (
                    <div className="contenido">{dataItem.answer}</div>
                  )
                : seleccionado === dataItem.id && (
                    <div className="contenido">{dataItem.answer}</div>
                  )}
              {/* {seleccionado === dataItem.id ||
              multiple.indexOf(dataItem.id) !== -1 ? (
                <div className="contenido">{dataItem.answer}</div>
              ) : null} */}
            </div>
          ))
        ) : (
          <div>No hay datos </div>
        )}
      </div>
    </div>
  );
}
