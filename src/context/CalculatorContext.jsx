import { createContext, useState, useEffect, useRef } from "react"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { calculateFinalPrice } from "../utils/priceCalculator"

export const CalculatorContext = createContext()

export const CalculatorProvider = ({ children }) => {
  const [savedState, setSavedState] = useLocalStorage("calc_data", null)

  const [hotel, setHotel] = useState(null)
  const [villa, setVilla] = useState(null)
  const [tours, setTours] = useState([])
  const [extras, setExtras] = useState([])

  const hasLoaded = useRef(false)

  // Load data from localStorage once
  useEffect(() => {
    if (savedState && !hasLoaded.current) {
      setHotel(savedState.hotel || null)
      setVilla(savedState.villa || null)
      setTours(Array.isArray(savedState.tours) ? savedState.tours : [])
      setExtras(Array.isArray(savedState.extras) ? savedState.extras : [])
      hasLoaded.current = true
    }
  }, [savedState])

  // Save state to localStorage when changed
  useEffect(() => {
    if (hasLoaded.current) {
      setSavedState({ hotel, villa, tours, extras })
    }
  }, [hotel, villa, tours, extras])

  // Update hotel (with calculated total)
  const updateHotel = (data) => {
    const base = data.basePrice * (data.nights || 1)
    setHotel({
      ...data,
      totalPrice: calculateFinalPrice(base, data.markupType, data.markupValue),
    })
  }

  // Update villa (with calculated total)
  const updateVilla = (data) => {
    const base = data.basePrice * (data.nights || 1)
    setVilla({
      ...data,
      totalPrice: calculateFinalPrice(base, data.markupType, data.markupValue),
    })
  }

  // ✅ Update tour list (langsung replace array)
  const updateTours = (newTours) => {
    setTours(newTours)
  }

  // ✅ (Opsional) Tambah/remove tour manual
  const addTour = (tour) => setTours((prev) => [...prev, tour])
  const removeTour = (index) => setTours((prev) => prev.filter((_, i) => i !== index))

  const addExtra = (extra) => setExtras((prev) => [...prev, extra])
  const removeExtra = (index) => setExtras((prev) => prev.filter((_, i) => i !== index))

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
        updateHotel, updateVilla, updateTours,
        setTours, setExtras,
        addTour, removeTour,
        addExtra, removeExtra,
        totalPrice,
        resetAll,
      }}
    >
      {children}
    </CalculatorContext.Provider>
  )
}
