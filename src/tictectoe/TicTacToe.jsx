import React, { useReducer, useCallback } from 'react'
import Table from './Table'

const initialState = {
    winner: '',
    turn: '0',
    tableData: [['', '', ''], ['', '', ''], ['', '', '']]
}

const SET_WINNER = 'SET_WINNER'

const reducer = (state, action) => {
    switch(action.type) {
        case SET_WINNER:
            return {
                ...state,
                winner: action.winner
            }
        default:
    }
}

const TicTecToe = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    // const [winner, setWinner] = useState('')
    // const [turn, setTurn] = useState('0')
    // const [TableData, setTableData] = useState([['', '', ''], ['', '', ''], ['', '', '']])
    
    const onClickTable = useCallback(() => {
        dispatch({ type: SET_WINNER, winner: 'o' })
    }, [])

    return (
        <>
            <Table onClick={onClickTable} />
            {state.winner && <div>{state.winner}님의 승리</div>}
        </>
    )
}

export default TicTecToe