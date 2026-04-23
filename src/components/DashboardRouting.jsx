import React, { useState } from 'react'
import { Button } from '@heroui/react';
import { Outlet, useNavigate } from 'react-router-dom';
import ProgressStates from './ProgressStates';
import MostUsedHerbasStates from './MostUsedHerbasStates';
import QuizessStates from './QuizessStates';

export default function DashboardRouting() {
    const navigate = useNavigate()
    const [states, setStates] = useState([
        { id: 0, stateName: "Weakly Progress", component: <ProgressStates /> },
        { id: 1, stateName: "Most Used Herbas", component: <MostUsedHerbasStates /> },
        { id: 2, stateName: "Quizzes", component: <QuizessStates /> },
    ])
    const [activeState, setActiveState] = useState('Weakly Progress')
    return <>
        <div className="w-full flex flex-wrap lg:flex-nowrap gap-3 overflow-hidden">
            <div className="w-full lg:w-1/5 px-3 py-5 lg:p-3 lg:space-y-5 space-x-5 bg-white dark:bg-gray-200 text-black flex lg:flex-col rounded-md">
                {states.map(state => <Button onPress={() => { setActiveState(state.stateName) }} key={state.id} variant='solid' className={`w-full rounded-md bg-[#335D39cc] ${activeState === state.stateName ? ' bg-[#335D39]' : ''}`}>{state.stateName}</Button>)}
            </div>
            <div className="w-full lg:w-4/5 flex justify-center items-center bg-white dark:bg-gray-200 text-black rounded-md">
                {states.find((s) => s.stateName === activeState).component}
            </div>
        </div>
    </>
}
