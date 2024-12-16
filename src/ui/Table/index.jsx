import React from 'react';
import { Badge } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

const CustomTable = ({ headings, data, dataToShow }) => {
    return (
        <Table striped hover rounded className='shadow-sm'>
            <thead>
                <tr>
                    {headings.map((heading, index) => (
                        <th key={index}>{heading}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {dataToShow.map((property, colIndex) => (
                            <td key={colIndex}>
                                {property == 'type'?(
                                    row[property] === 'income' ? (
                                        <Badge style={{fontSize: '15px'}} bg="success">{row[property]}</Badge>
                                    ) : (
                                        <Badge style={{fontSize: '15px'}} bg="danger">{row[property]}</Badge>
                                    )
                                ):
                                property.includes('amount')?(
                                    property == 'amount' ? 
                                    `${row[property]} ${row.currency}`
                                    :
                                    `${row[property]} USD`
                                ):
                                (
                                    row[property] !== undefined ? row[property] : 'N/A'
                                )}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default CustomTable;
