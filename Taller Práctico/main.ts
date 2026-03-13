interface GatoImagen {
  id: string
  url: string
  ancho: number
  altura: number
}

const boton = document.getElementById("btnGato")
const contenedor = document.getElementById("contenedor")

async function obtenerGatos(): Promise<GatoImagen[]> {

  try {

    const respuesta = await fetch("https://api.thecatapi.com/v1/images/search?limit=10")

    const datos: GatoImagen[] = await respuesta.json()

    return datos

  } catch (error) {

    console.log("Error al obtener gatos")

    return []
  }
}

async function mostrarGatos() {

  if(!contenedor) return

  contenedor.innerHTML = "Cargando gatos..."

  const gatos = await obtenerGatos()

  contenedor.innerHTML = ""

  gatos.forEach(gato => {

    contenedor.innerHTML += `
      <div class="card">
        <img src="${gato.url}">
        <p>ID: ${gato.id}</p>
      </div>
    `
  })
}

boton?.addEventListener("click", mostrarGatos)
