import React, { useState, useRef } from 'react'

const LectureResponseCheck = () => {
    const [state, setState] = useState('waiting')
    const [message, setMessage] = useState('클릭해서 시작하세요')
    const [result, setResult] = useState([])
    const timeout = useRef(null)
    const startTime = useRef()
    const endTime = useRef()

    const onClickScreen = () => {
        console.log(timeout)
        if(state === 'waiting') {
            setState('ready')
            setMessage('초록색이 되면 클릭하세요')
            timeout.current = setTimeout(() => {
                setState('now')
                setMessage('지금클릭')
                startTime.current = new Date()
            }, Math.floor(Math.random()*1000)+2000)
        } else if (state === 'ready') { // 성급하게 클릭
            clearTimeout(timeout.current)
            setState('waiting')
            setMessage('너무 성급했습니다')
        } else if (state === 'now') { // 반응속도 체크
            endTime.current = new Date
            setState('waiting')
            setMessage('클릭해서 시작하세요')
            setResult(prevState => {
                return [...prevState, endTime.current - startTime.current]
            })
        }
    }
    const onReset = () => {
        setResult([ ])
    }
    return (
        <>
            <div
                id="screen"
                className={state}
                onClick={onClickScreen}
            >
                {message}
            </div>
            {result.length === 0
                ? null
                : <>
                    <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
                    <button onClick={onReset}>취소</button>
                    </>
            }
        </>
    )
}

export default LectureResponseCheck