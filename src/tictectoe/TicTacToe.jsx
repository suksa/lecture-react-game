import React, { useEffect, useReducer, useCallback } from 'react'
import Table from './Table'

const initialState = {
    winner: '',
    turn: 'O',
    tableData: [['', '', ''], ['', '', ''], ['', '', '']],
    recentCell: [-1, -1]
}

export const SET_WINNER = 'SET_WINNER'
export const CLICK_CELL = 'CLICK_CELL'
export const CHANGE_TURN = 'CHANGE_TURN'

const reducer = (state, action) => {
    switch(action.type) {
        case SET_WINNER:
            return {
                ...state,
                winner: action.winner
            }
        case CLICK_CELL: {
            const tableData = [...state.tableData]
            tableData[action.row] = [...tableData[action.row]]  //immer라는 라이브러리로 가독성 해결
            tableData[action.row][action.cell] = state.turn
            return {
                ...state,
                tableData,
                recentCell: [action.row, action.cell]
            }
        }
        case CHANGE_TURN: {
            return {
                ...state,
                turn: state.turn === 'O' ? 'X' : 'O'
            }
        }
            
        default:
    }
}

const TicTecToe = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const { tableData, turn, winner} = state
    // const [winner, setWinner] = useState('')
    // const [turn, setTurn] = useState('0')
    // const [TableData, setTableData] = useState([['', '', ''], ['', '', ''], ['', '', '']])
    
    const onClickTable = useCallback(() => {
        dispatch({ type: SET_WINNER, winner: 'o' })
    }, [])

    useEffect(() => {

    }, [state.recentCell])

    return (
        <>
            <Table onClick={onClickTable} tableData={state.tableData} dispatch={dispatch} />
            {winner && <div>{winner}님의 승리</div>}
        </>
    )
}

export default TicTecToe