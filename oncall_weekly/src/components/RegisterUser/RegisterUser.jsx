import { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { collection, addDoc } from "firebase/firestore"; 
import { db } from "../../firebase/config";
import { toast } from "react-toastify";
import styles from "./RegisterUser.module.css";

function RegisterUser({ obtenerNombres }) { 
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("");
  const [loading, setLoading] = useState(false);

  const manejarGuardar = async () => {
    if (!nombre || !tipo) {
      toast.error("Completa todos los campos");
      return;
    }

    try {
      setLoading(true);
      await addDoc(collection(db, "departamentos"), {
        nombre,
        tipo: tipo.toLowerCase(), 
      });

      await obtenerNombres(); 

      toast.success("Usuario agregado correctamente");
      setNombre("");
      setTipo("");
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("No se pudo agregar el usuario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <Card.Body>
          <Card.Title className={styles.title}>Agregar Usuario</Card.Title>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Departamento</Form.Label>
              <Form.Select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                <option value="">Selecciona</option>
                <option value="switch">Switch</option>
                <option value="core">Core</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre del usuario"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </Form.Group>

            <Button className="w-100" onClick={manejarGuardar} disabled={loading}>
              {loading ? "Guardando..." : "Guardar Usuario"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default RegisterUser;