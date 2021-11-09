import React, { useState, useEffect } from 'react'

import { Row, Col, DatePicker, Radio, Space } from 'antd';


const Scheduler = ({ user }) => {
    // console.log({ user });
    const [nav, setNav] = useState(0);
    const [clickedDay, setClickedDay] = useState(null)
    const [viewSch, setViewSch] = useState("month")

    const handleViewChange = (e) => setViewSch(e.target.value);
    const events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];
    const weekdays = [
        'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ];

    const load = () => {
        const calendar = document.querySelector('.calendar')
        const date = new Date();
        const day = date.getDay();
        const month = date.getMonth(); //is the index value so its starting from 0, 1 ,2 ...,11
        const year = date.getFullYear();
        // console.log(day, month, year);
        const firstDayOfMonth = new Date(year, month, 1);
        const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
            weekday: "long",
            year: "numeric",
            month: "numeric",
            day: "numeric",
        });

        console.log(dateString.split(',')[0]);
        //? tricky: getting the last day of the previous month, thats the day is 0
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        console.log(daysInMonth);

        const FIRST_DAY_OF_MONTH = dateString.split(', ')[0];
        const paddingDays = weekdays.indexOf(FIRST_DAY_OF_MONTH)
        console.log(paddingDays);
        for (let i = 1; i <= paddingDays + daysInMonth; i++) {
            const daySquare = document.createElement('div');
            daySquare.classList.add('day')

            if (i > paddingDays) {
                daySquare.innerText = i - paddingDays;
                daySquare.addEventListener('click', console.log('click'))
            } else {
                daySquare.classList.add('padding')
            }
            calendar?.appendChild(daySquare)
        }
    }
    useEffect(() => {
        load();
    }, [])


    return (
        <div className="scheduler">
            <div className="sch-head">
                <Space
                    size="large"
                    align="center"
                    direction="horizontal"
                    className="weekdays"
                >
                    <div>Sunday</div>
                    <div>Monday</div>
                    <div>Tuesday</div>
                    <div>Wednesday</div>
                    <div>Thursday</div>
                    <div>Friday</div>
                    <div>Saturday</div>
                </Space>
            </div>
            <div className="sch-main">
                <div className="calendar">
                </div>
            </div>
        </div>
    )
};

export default Scheduler;
