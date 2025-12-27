import React, { useContext, useEffect, useState } from 'react'
import { IndAndVal } from './IndexAndValue';
import {Tasks} from './Task_Board_1'

const Board_1 = () => {

    const {setIndex, setValue} = useContext(IndAndVal);
    const {tasks, setTasks} = useContext(Tasks);
    
    return (
        <div className="flex flex-col board-1 flex-1 bg-[#444] w-[30%] justify-between rounded-lg p-2">

            <div className="flex justify-between items-center w-[100%] h-[10%]">

                <div>Todo</div>
                <div>{tasks.length}</div>

            </div>

            <div className="flex flex-col h-full w-full gap-3">

                {tasks.map((elem, idx) => {
                    return <div key={idx} className="--tasks h-[25%] w-full rounded-lg bg-black text-white p-2 hover:scale-95 hover:transition-transform duration-300" draggable="true" onDragStart={() => {
                        setIndex(idx);
                        setValue(elem);
                    }}>
                        <div className='text-xl font-bold'>{elem.title}</div>
                        <div className='text-sm'>{elem.description}</div>
                        <div className='flex justify-end'><button className='bg-red-500 p-1 text-sm text-white font-bold rounded-lg' onClick={() => {
                            setTasks(tasks.filter((_, index) => {
                                return idx != index;
                            }))
                        }}>Delete</button></div>

                    </div>
                })}

            </div>

        </div>
    )
}

export default Board_1
