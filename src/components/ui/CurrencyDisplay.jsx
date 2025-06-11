const CurrencyDisplay = ({ amount = 0 }) => {
  return <>Rp {Number(amount).toLocaleString("id-ID")}</>
}

export default CurrencyDisplay
