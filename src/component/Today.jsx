import React from 'react';
import './Today.scss'
const week = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"]
const EvenText = () => {
    return (<h4 className="text">
        身分證末碼為<span>2</span>,<span>4</span>,<span>6</span>,<span>8</span>,<span>0</span>可購買
    </h4>)
}
const OddText = () => {
    return (<h4 className="text">
        身分證末碼為<span>1</span>,<span>3</span>,<span>5</span>,<span>7</span>,<span>9</span>可購買
    </h4>)
}
const AllText = () => {
    return (<h4 className="text">
        所有人皆可購買
    </h4>)
}
const Today = () => {
    const date = (() => {
        const date = new Date()
        let year = date.getFullYear()
        let mon = date.getMonth() + 1
        let day = date.getDate()
        return {
            today: year + "-" + (mon < 10 ? "0" + mon.toString() : mon) + "-" + (day < 10 ? "0" + day.toString() : day),
            weekDay: date.getDay()
        }
    })()
    const text = (() => {
        if (date.weekDay === 7) {
            return (<AllText />)
        } else if (date.weekDay % 2 === 0) {
            return (<EvenText />)
        } else {
            return (<OddText />)
        }
    })()
    return (
        <div className="today-box">
            <h2>{week[date.weekDay - 1]}</h2>
            <div>
                <h3>{date.today}</h3>
                {text}
            </div>
        </div>
    );
}

export default Today;
