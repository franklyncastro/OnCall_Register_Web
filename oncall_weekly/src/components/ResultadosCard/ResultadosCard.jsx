import "../../style/resultCard.css";

function ResultadosCard({ asignaciones, setAsignaciones }) {
  const eliminarSemana = (id) => {
    const confirmar = confirm("¿Deseas eliminar esta semana?");
    if (!confirmar) return;
    const nuevas = asignaciones.filter((a) => a.id !== id);
    setAsignaciones(nuevas);
  };

  return (
    <div className="resultados-card">
      <h2>OnCall de la Semana</h2>
      {asignaciones.length === 0 ? (
        <p className="vacio">No hay registros aún.</p>
      ) : (
        asignaciones.map((semana) => (
          <div className="semana-item" key={semana.id}>
            <div className="semana-info">
              <span className="fechas">
                {semana.inicio} hasta {semana.fin}
              </span>
              
            </div>

            <div className="departamentos">
              <div className="dep">
                <strong>Switch:</strong> {semana.switch}
              </div>
              <div className="dep">
                <strong>Core:</strong> {semana.core}
              </div>

            <div>
              <button class="button" onClick={() => eliminarSemana(semana.id)}>
                <svg viewBox="0 0 448 512" class="svgIcon"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg>
            </button>
            
            </div>
             

            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ResultadosCard;
