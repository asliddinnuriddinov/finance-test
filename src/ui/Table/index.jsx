import React from 'react';
import { Badge } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import styles from '../../layout/Layout.module.css';

const CustomTable = ({ headings, data, dataToShow, onRowClick }) => {
    return (
        <div className="table-responsive">
            <Table striped hover className={`${styles.animation} ${styles.table} shadow-sm`}>
                <thead>
                    <tr>
                        {headings.map((heading, index) => (
                            <th key={index} className="text-nowrap">{heading}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data?.length>0 ? data.map((row, rowIndex) => (
                        <tr 
                            key={rowIndex} 
                            onClick={() => onRowClick?.(row)}
                            style={{ cursor: onRowClick ? 'pointer' : 'default' }}
                        >
                            {dataToShow.map((property, colIndex) => (
                                <td style={{padding: '12px'}} key={colIndex} className="text-break">
                                    {property == 'type'?(
                                        row[property] === 'income' ? (
                                            <Badge style={{fontSize: '14px'}} bg="success">{row[property]}</Badge>
                                        ) : (
                                            <Badge style={{fontSize: '14px'}} bg="danger">{row[property]}</Badge>
                                        )
                                    ):
                                    property.includes('amount')?(
                                        property == 'amount' ? 
                                        `${row[property]} ${row.currency}`
                                        :
                                        `${row[property]} USD`
                                    ):
                                    (
                                        row[property] && row[property].length<35 ? row[property] : row[property] ? row[property].slice(0,32)+'...' : 'N/A'
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))
                    :(
                        <tr>
                            <td style={{textAlign: 'center', padding: '20px'}} colSpan={dataToShow.length}>No data available</td>
                        </tr>
                    )
                }
                </tbody>
            </Table>
        </div>
    );
};

export default CustomTable;
