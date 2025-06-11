import { createContext, useContext, useState, useEffect } from "react"
import { useLocalStorage } from "../hooks/useLocalStorage"

const CalculatorContext = createContext()

export const CalculatorProvider = ({ children }) => {
  const [savedState, setSavedState] = useLocalStorage("calc_data", null)

  const [hotel, setHotel] = useState(null)
  const [villa, setVilla] = useState(null)
  const [tours, setTours] = useState([])
  const [extras, setExtras] = useState([])

  // Load saved data
  useEffect(() => {
    if (savedState) {
      setHotel(savedState.hotel || null)
      setVilla(savedState.villa || null)
      setTours(savedState.tours || [])
      setExtras(savedState.extras || [])
    }
  }, [])

  // Save on every change
  useEffect(() => {
    setSavedState({ hotel, villa, tours, extras })
  }, [hotel, villa, tours, extras])

  const resetAll = () => {
    setHotel(null)
    setVilla(null)
    setTours([])
    setExtras([])
    setSavedState(null)
  }

  const totalPrice =
    (hotel?.totalPrice || 0) +
    (villa?.totalPrice || 0) +
    tours.reduce((sum, t) => sum + (t.finalPrice || 0), 0) +
    extras.reduce((sum, e) => sum + (e.finalPrice || 0), 0)

  return (
    <CalculatorContext.Provider
      value={{
        hotel, villa, tours, extras,
        setHotel, setVilla, setTours, setExtras,
        updateHotel: setHotel,
        updateVilla: setVilla,
        addTour: (t) => setTours((prev) => [...prev, t]),
        removeTour: (i) => setTours((prev) => prev.filter((_, idx) => idx !== i)),
        addExtra: (e) => setExtras((prev) => [...prev, e]),
        removeExtra: (i) => setExtras((prev) => prev.filter((_, idx) => idx !== i)),
        totalPrice,
        resetAll,
      }}
    >
      {children}
    </CalculatorContext.Provider>
  )
}

export const useCalculator = () => useContext(CalculatorContext)
