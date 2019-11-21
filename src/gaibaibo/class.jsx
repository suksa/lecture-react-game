import React, { Component } from 'react'

const rspCoords = {
    바위: '0',
    가위: '-142px',
    보: '-280px'
}

const scores = {
    가위: 1,
    바위: 0,
    보: -1
}

const timer = 100

const computerChoice = imgCoord => {
    return Object.entries(rspCoords).find(function(v) {
        return v[1] === imgCoord
    })[0]
}

export default class RSP extends Component {
    state = {
        result: '',
        imgCoord: '0', //0 142 280
        score: 0
    }

    interval
    timeOut

    componentDidMount() { // 비동기요청 많이 함
        this.interval = setInterval(this.changeHand, timer);
    }

    componentDidUpdate() { // 리렌더링 후 실행

    }

    componentWillUnmount() { // 컴포넌트가 제거되기 직전 , 비동기 요청을 정리.
        clearInterval(this.interval)
    }

    changeHand = () => {
        const { imgCoord } = this.state
        if(imgCoord === rspCoords.바위) {
            this.setState({
                imgCoord: rspCoords.가위
            })
        } else if (imgCoord === rspCoords.가위) {
            this.setState({
                imgCoord: rspCoords.보
            })
        } else if (imgCoord === rspCoords.보) {
            this.setState({
                imgCoord: rspCoords.바위
            })
        }
    }

    onClickBtn = choice => () => {
        const { imgCoord } = this.state
        clearInterval(this.interval)
        const myScore = scores[choice]
        const cpuScore = scores[computerChoice(imgCoord)]
        const diff = myScore - cpuScore
        if(diff === 0){
            this.setState({
                result: '비겼습니다'
            })
        } else if ([-1, 2].includes(diff)) {
            this.setState(prevState => {
                return {
                    result: '이겼습니다',
                    score: prevState.score + 1
                }
            })
        } else {
            this.setState(prevState => {
                return {
                    result: '졌습니다',
                    score: prevState.score - 1
                }
            })
        }
        clearTimeout(this.timeOut)
        this.timeOut = setTimeout(() => {
            this.interval = setInterval(this.changeHand, timer);
        },0)
    }

    render() {
        const { onClickBtn } = this
        const { result, score, imgCoord } = this.state
        return (
            <>
                <div id="computer"
                     style={{ background: `url(http://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }}>
                </div>
                <div>
                    <button id="rock" className="btn" onClick={onClickBtn('바위')}>바위</button>
                    <button id="scissor" className="btn" onClick={onClickBtn('가위')}>가위</button>
                    <button id="paper" className="btn" onClick={onClickBtn('보')}>보</button>
                </div>
                <div>{result}</div>
                <div>현재 {score}점</div>
            </>
        )
    }
}
