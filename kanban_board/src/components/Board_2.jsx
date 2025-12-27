import React, { useContext, useEffect, useState } from 'react'
import { IndAndVal } from './IndexAndValue';
import {Tasks} from './Task_Board_1'
import {InProgress} from './InProgress_Board_2'

const Board_2 = () => {

    const {inProgress, setInProgress} = useContext(InProgress);
    const {tasks, setTasks} = useContext(Tasks);
    const {Index, setIndex, Value, setValue} = useContext(IndAndVal);
    const [onDropFlag, setOnDropFlag] = useState(false);

    return (
        <div className={`flex flex-col board-2 flex-1 bg-[#444] w-[30%] justify-between rounded-lg p-2 ${(onDropFlag) ? 'border-2 border-dashed scale-105 transition-transform duration-300' : 'border-none'}`}>

            <div className="flex justify-between items-center w-[100%] h-[10%] mb-4">

                <div>In-Progress</div>
                <div>{inProgress.length}</div>

            </div>

            <div className="flex flex-col h-full w-full gap-4" draggable='true' onDragOver={(e) => {
                e.preventDefault();
                setOnDropFlag(true)
            }}

                onDragLeave={() => {
                    setOnDropFlag(false);
                }}

                onDrop={() => {

                    setOnDropFlag(false);

                    const alreadyExists = inProgress.some(
                        (t) => t.title === Value.title && t.description === Value.description
                    );

                    if (alreadyExists) {
                        setValue(null);
                        setIndex(null);
                        return;
                    }

                    setInProgress([...inProgress, Value]);

                    setValue(null);
                    setIndex(null);
                    setTasks(tasks.filter((_, idx) => {
                        return idx != Index;
                    }))
                }}>
                {inProgress.map((elem, idx) => {
                    return <div key={idx} className="--tasks h-[25%] w-full rounded-lg bg-black text-white p-2 hover:scale-95 hover:transition-transform duration-300" draggable onDragStart={() => {
                        setValue(elem);
                        setIndex(idx);
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

export default Board_2
