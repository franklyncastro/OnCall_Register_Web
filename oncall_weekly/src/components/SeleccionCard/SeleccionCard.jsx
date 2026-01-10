import { useState } from "react";
import { Form, Button, Card, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import styles from './SeleccionCard.module.css'

function SeleccionCard({
  asignaciones,
  agregarAsignacion,
  nombresSwitch,
  nombresCore,
}) {
  const [switchPerson, setSwitchPerson] = useState("");
  const [corePerson, setCorePerson] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [loading, setLoading] = useState(false);

  const manejarGuardar = async () => {
    if (!switchPerson || !corePerson || !fechaInicio || !fechaFin) {
      Swal.fire("Campos incompletos", "Completa todos los campos", "error");
      return;
    }

    if (new Date(fechaFin) < new Date(fechaInicio)) {
      Swal.fire(
        "Fecha incorrecta",
        "La fecha final no puede ser menor",
        "error"
      );
      return;
    }

    const existe = asignaciones.some(
      (a) =>
        a.inicio === fechaInicio &&
        a.fin === fechaFin &&
        a.switch === switchPerson &&
        a.core === corePerson
    );

    if (existe) {
      Swal.fire("Duplicado", "Esta asignación ya existe", "warning");
      return;
    }

    const nuevaSemana = {
      inicio: fechaInicio,
      fin: fechaFin,
      switch: switchPerson,
      core: corePerson,
      creado: new Date().toISOString(),
    };

    try {
      setLoading(true);
      await agregarAsignacion(nuevaSemana);

      Swal.fire({
        icon: "success",
        title: "OnCall registrado",
        timer: 1500,
        showConfirmButton: false,
      });

      setSwitchPerson("");
      setCorePerson("");
      setFechaInicio("");
      setFechaFin("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <Card.Body>
          <Card.Title className={styles.title}>
            Agregar OnCall
          </Card.Title>

          <Form>
            <Row className="mb-5">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Switch</Form.Label>
                  <Form.Select
                    value={switchPerson}
                    onChange={(e) => setSwitchPerson(e.target.value)}
                  >
                    <option value="">Selecciona</option>
                    {nombresSwitch.map((n, i) => (
                      <option key={i} value={n}>
                        {n}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>Core</Form.Label>
                  <Form.Select
                    value={corePerson}
                    onChange={(e) => setCorePerson(e.target.value)}
                  >
                    <option value="">Selecciona</option>
                    {nombresCore.map((n, i) => (
                      <option key={i} value={n}>
                        {n}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Fecha inicio</Form.Label>
                  <Form.Control
                    type="date"
                    value={fechaInicio}
                    onChange={(e) => setFechaInicio(e.target.value)}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>Fecha fin</Form.Label>
                  <Form.Control
                    type="date"
                    value={fechaFin}
                    onChange={(e) => setFechaFin(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Button
              className="w-100"
              onClick={manejarGuardar}
              disabled={loading}
            >
              {loading ? "Guardando..." : "Registrar OnCall"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default SeleccionCard;
