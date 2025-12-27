import React, { useContext, useEffect, useState } from 'react'
import { IndAndVal } from './IndexAndValue';
import {Tasks} from './Task_Board_1'
import {InProgress} from './InProgress_Board_2'

const Board_3 = () => {

    const {tasks, setTasks} = useContext(Tasks);
    const {inProgress, setInProgress} = useContext(InProgress);
    const {Index, setIndex, Value, setValue} = useContext(IndAndVal);
    const [done, setDone] = useState(() => {
        const data = localStorage.getItem('done');
        return data ? JSON.parse(data) : [];
      });
    const [onDropFlag_1, setOnDropFlag_1] = useState(false);
    useEffect(() => {
        localStorage.setItem('done', JSON.stringify(done));
    }, [done])

    return (

        <div className={`flex flex-col board-3 flex-1 bg-[#444] w-[30%] justify-between rounded-lg p-2 ${(onDropFlag_1) ? 'border-2 border-dashed scale-105 transition-transform duration-300' : 'border-none'}`}>
            <div className="flex justify-between items-center w-[100%] h-[10%] mb-4">

                <div>Done</div>
                <div>{done.length}</div>

            </div>

            <div className="flex flex-col h-full w-full gap-3" onDragOver={(e) => {
                e.preventDefault();
                setOnDropFlag_1(true);
            }}

                onDragLeave={() => {
                    setOnDropFlag_1(false);
                }}

                onDrop={() => {
                    setOnDropFlag_1(false);

                    const alreadyExists = done.some(
                        (t) => t.title === Value.title && t.description === Value.description
                    );

                    if (alreadyExists) {
                        setValue(null);
                        setIndex(null);
                        return;
                    }

                    setDone([...done, { title: Value.title, description: Value.description }]);
                    setValue(null);
                    setIndex(null);
                    setTasks(tasks.filter((_, idx) => {
                        return Index != idx;
                    }))
                    setInProgress(inProgress.filter((_, idx) => {
                        return Index != idx;
                    }))
                    setOnDropFlag_1(false);
                }}>
                {done.map((elem, idx) => {
                    return <div key={idx} className="--tasks h-[25%] w-full rounded-lg bg-black text-white p-2 hover:scale-95 hover:transition-transform duration-300">
                        <div className='text-xl font-bold'>{elem.title}</div>
                        <div className='text-sm'>{elem.description}</div>
                        <div className='flex justify-end'><button className='bg-red-500 p-1 text-sm text-white font-bold rounded-lg' onClick={() => {
                            setDone(done.filter((_, index) => {
                                return idx != index;
                            }))
                        }}>Delete</button></div>
                    </div>
                })}
            </div>


        </div>
    )
}

export default Board_3
