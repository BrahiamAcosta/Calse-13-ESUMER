import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  /*
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      setLoading(false);
    });
  */

  useEffect(() => {
    async function cargarUsuarios() {
      try {
        const respuesta = await fetch(
          "https://jsonplaceholder.typicode.com/users",
        );

        if (!respuesta.ok) {
          throw new Error("Error en la solicitud" + respuesta.status);
        }

        const datos = await respuesta.json();
        console.log(datos);
        setData(datos);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    cargarUsuarios();
  }, []);
  return (
    <>
      <h1>Consumo de APIS</h1>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        data.map((usuario) => {
          return (
            <div key={usuario.id}>
              <h2>{usuario.name}</h2>
              <p>{usuario.email}</p>
            </div>
          );
        })
      )}
    </>
  );
}

export default App;
