import React from 'react';
import {
    Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Text
} from '@chakra-ui/react';

const orange = "#FFA726";
const orangeLight = "#FFE0B2";
const gray = "#F5F5F5";

const tableHeaderStyle = {
    backgroundColor: orange,
    color: "#222",
    fontWeight: "bold",
    fontSize: "1rem",
    padding: "2px 20px 12px 10px",
};

const tableSubHeaderStyle = {
    backgroundColor: orangeLight,
    fontWeight: "bold",
    padding: "2px 20px 12px 10px",
};

const tableTotalStyle = {
    backgroundColor: orange,
    fontWeight: "bold",
    padding: "2px 20px 12px 10px",
};

const tableCellStyle = {
    padding: "2px 30px 12px 10px",
    verticalAlign: "top",
}

const ItineraryTable = ({ days, formatCurrency }) => {
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const options = { 
            weekday: 'short', 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        };
        return date.toLocaleDateString('id-ID', options);
    };

    const calculateTotalExpenses = () => {
        let total = 0;
        days.forEach(day => {
            // Calculate total from regular activities
            day.activities.forEach(activity => {
                if (activity.expense) {
                    const amount = parseFloat(
                        activity.expense.replace(/[^\d,-]/g, '')
                        .replace(/\./g, '')
                        .replace(',', '.')
                    );
                    if (!isNaN(amount)) {
                        total += amount;
                    }
                }
            });
            
            if (day.expenseItems) {
                day.expenseItems.forEach(expenseItem => {
                    const price = expenseItem.price || 0;
                    const quantity = expenseItem.quantity || 1;
                    total += (price * quantity);
                });
            }
        });
        return total;
    };

    const calculateTotalKidExpenses = () => {
        let total = 0;
        days.forEach(day => {
            day.activities.forEach(activity => {
                if (activity.kidExpense) {
                    const amount = parseFloat(
                        activity.kidExpense.replace(/[^\d,-]/g, '')
                        .replace(/\./g, '')
                        .replace(',', '.')
                    );
                    if (!isNaN(amount)) {
                        total += amount;
                    }
                }
            });
        });
        return total;
    };

    return (
        <Box mb={8} borderRadius="md" overflow="hidden">
            <Table variant="simple" size="sm">
                <Thead>
                    <Tr>
                        <Th textAlign="center" width="60px" style={tableHeaderStyle}>Day</Th>
                        <Th style={tableHeaderStyle}>Quotation</Th>
                        <Th textAlign="center" width="100px" style={tableHeaderStyle}>Expenses</Th>
                        <Th textAlign="center" width="100px" style={tableHeaderStyle}>Kid 4-9</Th>
                    </Tr>
                </Thead>
                <Tbody color={"#222"}>
                    {days.map((day, dayIndex) => (
                        <React.Fragment key={dayIndex}>
                            <Tr>
                                <Td textAlign="center" fontWeight="bold" style={tableSubHeaderStyle}>{day.day}</Td>
                                <Td fontWeight="bold" style={tableSubHeaderStyle}>
                                    <Box>
                                        <Text>{day.description}</Text>
                                        <Text fontSize="sm" color="#555" mt={1}>
                                            {formatDate(day.date)}
                                        </Text>
                                    </Box>
                                </Td>
                                <Td style={tableSubHeaderStyle}></Td>
                                <Td style={tableSubHeaderStyle}></Td>
                            </Tr>
                            {day.activities.map((activity, actIndex) => (
                                <Tr key={actIndex} _hover={{ background: gray }}>
                                    <Td></Td>
                                    <Td style={tableCellStyle}>• {activity.item}</Td>
                                    <Td style={tableCellStyle}>{activity.expense}</Td>
                                    <Td style={tableCellStyle}>{activity.kidExpense || '-'}</Td>
                                </Tr>
                            ))}
                            {/* Display expense items if they exist */}
                            {day.expenseItems && day.expenseItems.map((expenseItem, expIndex) => (
                                <Tr key={`exp-${expIndex}`} _hover={{ background: gray }}>
                                    <Td></Td>
                                    <Td style={tableCellStyle}>• {expenseItem.label}</Td>
                                    <Td style={tableCellStyle}>{formatCurrency(expenseItem.price * expenseItem.quantity)}</Td>
                                    <Td style={tableCellStyle}>-</Td>
                                </Tr>
                            ))}
                        </React.Fragment>
                    ))}
                    <Tr>
                        <Td colSpan={3} style={tableTotalStyle}>
                            Total Expenses
                        </Td>
                        <Td textAlign="right" style={tableTotalStyle}>
                            {formatCurrency(calculateTotalExpenses()+calculateTotalKidExpenses())}
                        </Td>
                    </Tr>
                </Tbody>
            </Table>
        </Box>
    );
};

export default ItineraryTable;