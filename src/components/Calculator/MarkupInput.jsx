import {
  FormLabel, HStack, NumberInput, NumberInputField, Select
} from "@chakra-ui/react"

const MarkupInput = ({
  label = "Markup",
  value = 0,
  type = "percent",
  onTypeChange,
  onValueChange,
}) => {
  return (
    <>
      <FormLabel>{label}</FormLabel>
      <HStack>
        <Select
          w="40%"
          value={type}
          onChange={(e) => onTypeChange(e.target.value)}
        >
          <option value="percent">%</option>
          <option value="fixed">Rp</option>
        </Select>
        <NumberInput
          min={0}
          value={value}
          onChange={(_, val) => onValueChange(val)}
        >
          <NumberInputField />
        </NumberInput>
      </HStack>
    </>
  )
}

export default MarkupInput
