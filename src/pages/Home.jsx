import { useState, useEffect } from 'react'
import { getVinilos } from '../api/vinilos'
import VinilosGrid from '../components/VinilosGrid'
import ModalVinilo from '../components/ModalVinilo'
import FormularioContacto from '../components/FormularioContacto'

const Home = () => {
  const [vinilos, setVinilos] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [busqueda, setBusqueda] = useState('')
  const [viniloSeleccionado, setViniloSeleccionado] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    getVinilos()
      .then(data => {
        setVinilos(data)
        setIsLoading(false)
      })
      .catch(() => {
        setError('No se pudo conectar con el servidor.')
        setIsLoading(false)
      })
  }, [])

  const vinilosFiltrados = vinilos.filter(v =>
    v.titulo?.toLowerCase().includes(busqueda.toLowerCase()) ||
    v.artista?.toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <>
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="input-group search-box">
              <input
                className="form-control border-dark"
                type="text"
                placeholder="Buscar álbum o artista..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
              <span className="btn btn-dark border-cyan">
                <i className="fa-solid fa-magnifying-glass text-cyan-icon"></i>
              </span>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="container mt-3">
          <div className="alert alert-danger text-center">{error}</div>
        </div>
      )}

      <VinilosGrid
        items={vinilosFiltrados}
        isLoading={isLoading}
        setViniloSeleccionado={setViniloSeleccionado}
      />

      <FormularioContacto />

      {viniloSeleccionado && (
        <ModalVinilo
          vinilo={viniloSeleccionado}
          cerrarModal={() => setViniloSeleccionado(null)}
        />
      )}
    </>
  )
}

export default Home
