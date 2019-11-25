import React from 'react'
import Tr from './Tr'

const Table = ({ onClick }) => {
    return (
        <table onClick={onClick}>
            <tbody>   
            <Tr>{''}</Tr>
            </tbody>
        </table>
    )
}

export default Table