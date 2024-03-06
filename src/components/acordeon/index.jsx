import { useState } from "react";
import data from "./data";

export default function Acordeon() {
  const [seleccionado, setSeleccionado] = useState(null);

  function handleSingleSelection(getCurrentId) {
    console.log(getCurrentId);
    setSeleccionado(getCurrentId === seleccionado ? null : getCurrentId);
  }

  console.log(seleccionado);

  return (
    <div className="wrapper">
      <div className="acordeon">
        {data && data.length > 0 ? (
          data.map((dataItem) => (
            <div className="iteam" key={dataItem.id}>
              <div
                onClick={() => handleSingleSelection(dataItem.id)}
                className="titulo"
              >
                <h3>{dataItem.question}</h3>
                <span>+</span>
              </div>
              {seleccionado === dataItem.id ? (
                <div className="contenido">{dataItem.answer}</div>
              ) : null}
            </div>
          ))
        ) : (
          <div>No hay datos </div>
        )}
      </div>
    </div>
  );
}
