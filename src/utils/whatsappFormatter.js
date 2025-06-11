export const generateWhatsAppMessage = ({ hotel, villa, tours, extras, total }) => {
  let lines = []

  if (hotel) {
    lines.push(`🏨 Hotel: ${hotel.name} – ${hotel.nights} malam – Rp ${hotel.totalPrice.toLocaleString("id-ID")}`)
  }

  if (villa) {
    lines.push(`🏡 Villa: ${villa.name} – ${villa.nights} malam – Rp ${villa.totalPrice.toLocaleString("id-ID")}`)
  }

  tours.forEach((t, i) => {
    lines.push(`🗺️ Tour ${i + 1}: ${t.name} – Rp ${t.finalPrice.toLocaleString("id-ID")}`)
  })

  extras.forEach((e, i) => {
    lines.push(`➕ Biaya Tambahan ${i + 1}: ${e.label} – Rp ${e.finalPrice.toLocaleString("id-ID")}`)
  })

  lines.push("")
  lines.push(`💰 *Total*: Rp ${total.toLocaleString("id-ID")}`)
  lines.push("")
  lines.push("Silakan konfirmasi untuk booking. Terima kasih!")

  return encodeURIComponent(lines.join("\n"))
}
