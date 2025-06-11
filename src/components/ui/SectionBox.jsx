import { Box } from "@chakra-ui/react"

const SectionBox = ({ children, title }) => (
  <Box p={4} borderWidth="1px" borderRadius="lg" shadow="sm" mt={4}>
    {title && <Box fontSize="lg" fontWeight="bold" mb={2}>{title}</Box>}
    {children}
  </Box>
)

export default SectionBox
