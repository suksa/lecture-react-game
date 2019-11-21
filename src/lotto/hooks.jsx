import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import Ball from './ball'

function getWinNumbers() {
    console.log('getWinNumbers')
    const candidate = Array(45).fill().map((v, i) => i + 1)
    const shuffle = []
    while (candidate.length > 0) {
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0])
    }
    const bonusNumber  = shuffle[shuffle.length - 1]
    const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c)
    return [...winNumbers, bonusNumber]
}

const Lotto = () => {
    const lottoNumbers = useMemo(() => getWinNumbers(), [])  // useMemo 함수 결과값(리턴값)을 기억 useCallback 은 함수 자체를 기억
    const [winNumbers, setWinNumbers] = useState(lottoNumbers)
    const [winBalls, setWinBalls] = useState([])
    const [bonus, setBonus] = useState(null)
    const [redo, setRedo] = useState(false)
    const timeouts = useRef([])

    const mounted = useRef(false)
    useEffect(() => {   // componentDidUpdate만 하고싶을때
        if(!mounted.current) {
            mounted.current = true
        } else {
            //ajax
        }
    }, ['바뀌는값'])

    useEffect(() => { // useEffect 여러개 가능
        for(let i = 0; i < winNumbers.length-1; i++){
            timeouts.current[i] = setTimeout(() => {
                setWinBalls(prevState => [...prevState, winNumbers[i]])
            }, (i+1)*1000 )
        }
        timeouts.current[6] = setTimeout(() => {
            setBonus(winNumbers[6])
            setRedo(true)
        }, 7000)
        return () => {
            timeouts.current.forEach(v => {
                clearTimeout(v)
            })
        };
    }, [timeouts.current])

    const onClickRedo = useCallback(() => { // 함수 자체를 기억 (함수 생성을 기억함) 프롭스로 내려줄땐 유즈콜백 권장 -- 자식요소 리렌더링 방지 
        console.log(winNumbers)
        setWinNumbers(getWinNumbers())
        setWinBalls([])
        setBonus(null)
        setRedo(false)
        timeouts.current = []
    }, [winNumbers])  // 변경될 값을 넣음 ex: console.log(winNumbers)

    return (
        <>
            <div>당첨 숫자</div>
            <div id="결과창">
                {winBalls.map(v => {
                    return(
                        <Ball key={v} number={v} />
                    )
                })}
            </div>
            <div>보너스!</div>
            {bonus && <Ball number={bonus} />}
            {redo && (
                <button onClick={onClickRedo}>한 번 더</button>
            )}
        </>
    )
}

export default Lotto