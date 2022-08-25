import {useState, createContext} from 'react'
import { obtenerDifYear, calcularMarca, calcularPlan, formatearDinero } from '../helpers'

const CotizadorContext = createContext()

const CotizadorProvider = ({children}) => {

    const [datos, setDatos] = useState({
        marca: '',
        year: '',
        plan: ''
    })

    const [error, setError] = useState('')
    const [resultado, setResultado] = useState(0)
    const [cargando, setCargando] = useState(false)

    const handleChangeDatos = e => {
        setDatos({
            ...datos,
            [e.target.name] : e.target.value
        })
    }

    const cotizarSeguro = () => {
        //Base
        let resultado = 2000

        //Diferencia de años
        const diferencia = obtenerDifYear(datos.year)

        //Restar 3% por año
        resultado -= ((diferencia * 0.03) * resultado)

        //Europeo 30%
        //Americano 15%
        //Asiatico 5%
        resultado *= calcularMarca(datos.marca)
    
        //Básico 20%
        //Completo 50%
        resultado *= calcularPlan(datos.plan)
       
        //Formatear dinero
        resultado = formatearDinero(resultado)
        
        setCargando(true)

        setTimeout(() => {
            setResultado(resultado)
            setCargando(false)
        }, 3000);
    }

    return (
        <CotizadorContext.Provider
            value={{
                datos,    
                handleChangeDatos,
                error,
                setError,
                cotizarSeguro,
                resultado,
                cargando
            }}
        >
            {children}
        </CotizadorContext.Provider>
    )
}

export {
    CotizadorProvider
}

export default CotizadorContext