import React, { useEffect, useState } from 'react'


const App = () => {

  const [onDropFlag, setOnDropFlag] = useState(false);
  const [onDropFlag_1, setOnDropFlag_1] = useState(false);
  const [Index, setIndex] = useState(null);
  const [Value, setValue] = useState(null);
  const [showTaskAddDiv, setShowTaskAddDiv] = useState(false);
  const [tasks, setTasks] = useState(() => {
    const data = localStorage.getItem('todo');
    return data ? JSON.parse(data) : [];
  });


  const [inProgress, setInProgress] = useState(() => {
    const data = localStorage.getItem('in_progress');
    return data ? JSON.parse(data) : [];
  });

  const [done, setDone] = useState(() => {
    const data = localStorage.getItem('done');
    return data ? JSON.parse(data) : [];
  });

  const [addTask, setAddTask] = useState("");
  const [addTaskDescription, setAddTaskDescription] = useState("");

  const formSubmitted = (e) => {


    setShowTaskAddDiv(false);

    e.preventDefault();
    setTasks([...tasks, { title: addTask, description: addTaskDescription }]);
    setAddTask("");
    setAddTaskDescription("");
  }

  // Fetching Local Storage Data

  useEffect(() => {
    localStorage.setItem('todo', JSON.stringify(tasks));
  }, [tasks])

  useEffect(() => {
    localStorage.setItem('in_progress', JSON.stringify(inProgress));
  }, [inProgress])

  useEffect(() => {
    localStorage.setItem('done', JSON.stringify(done));
  }, [done])

  return (
    <>

      <div className={`${showTaskAddDiv === true ? 'flex' : 'hidden'} flex-col h-[200px] w-[250px] rounded-lg absolute z-[999] bg-red-400 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 justify-center items-center`} onClick={() => {

      }}>
        <form onSubmit={(e) => {
          formSubmitted(e);
        }}>
          <input value={addTask} type="text" required className='p-2 w-[80%] h-[30%]' placeholder='Enter Task' onChange={(e) => {
            setAddTask(e.target.value);
          }} />
          <textarea value={addTaskDescription} required name="" id="" className='p-2' placeholder='Enter Task Description' onChange={(e) => {
            setAddTaskDescription(e.target.value);
          }}></textarea>
          <button type='submit' className='block p-2 rounded-lg bg-[#444] text-white font-bold mt-3'>Add Task</button>
        </form>
      </div>

      {/* main body */}

      <div className={`main ${showTaskAddDiv ? 'opacity-[0.4] blur-xs' : 'opacity-[1]'} bg-black h-screen text-white`}>

        {/* navigation */}

        <div className="nav h-[40px] flex justify-between items-center bg-[#333] pl-8 pr-7 ">
          <h1 className='text-lg font-bold'>Kanban Board</h1>
          <button className='rounded-lg pt-1 pb-1 pl-5 pr-5 bg-[#666] flex items-center justify-center' onClick={() => {
            setShowTaskAddDiv(true);
          }}>
            Add Task
          </button>

        </div>

        {/* app body */}

        <div className="flex h-[500px] gap-4 mt-5 p-5 ">
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
                  console.log(elem);
                }}>
                  <div className='text-xl font-bold'>{elem.title}</div>
                  <div className='text-sm'>{elem.description}</div>
                  <div className='flex justify-end'><button className='bg-red-500 p-1 text-sm text-white font-bold rounded-lg' onClick={()=>{
                    setTasks(tasks.filter((_, index)=>{
                      return idx != index;
                    }))
                  }}>Delete</button></div>

                </div>
              })}

            </div>

          </div>
          <div className={`flex flex-col board-2 flex-1 bg-[#444] w-[30%] justify-between rounded-lg p-2 ${(onDropFlag) ? 'border-2 border-dashed scale-105 transition-transform duration-300' : 'border-none'}`}>

            <div className="flex justify-between items-center w-[100%] h-[10%] mb-4">

              <div>In-Progress</div>
              <div>{inProgress.length}</div>

            </div>

            <div className="flex flex-col h-full w-full gap-4" draggable='true' onDragOver={(e) => {
              e.preventDefault();
              setOnDropFlag(true)
            }}

            onDragLeave={()=>{
              setOnDropFlag(false);
            }}

            onDrop={() => {

              setOnDropFlag(false);

              const alreadyExists = inProgress.some(
                (t) => t.title === Value.title && t.description === Value.description
              );

              if(alreadyExists){
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
                  <div className='flex justify-end'><button className='bg-red-500 p-1 text-sm text-white font-bold rounded-lg' onClick={()=>{
                    setInProgress(inProgress.filter((_, index)=>{
                      return idx != index;
                    }))
                  }}>Delete</button></div>
                </div>
              })}
            </div>

          </div>
          <div className={`flex flex-col board-3 flex-1 bg-[#444] w-[30%] justify-between rounded-lg p-2 ${(onDropFlag_1) ? 'border-2 border-dashed scale-105 transition-transform duration-300' : 'border-none'}`}>
            <div className="flex justify-between items-center w-[100%] h-[10%] mb-4 mt-4">

              <div>Done</div>
              <div>{done.length}</div>

            </div>

            <div className="flex flex-col h-full w-full gap-3" onDragOver={(e) => {
              e.preventDefault();
              setOnDropFlag_1(true);
            }} 

            onDragLeave={()=>{
              setOnDropFlag_1(false);
            }}
            
            onDrop={() => {
              setDone([...done, { title: Value.title, description: Value.description }]);
              setValue(null);
              setIndex(null);
              setInProgress(inProgress.filter((_, idx) => {
                return Index != idx;
              }))
              setOnDropFlag_1(false);
            }}>
              {done.map((elem, idx) => {
                return <div key={idx} className="--tasks h-[25%] w-full rounded-lg bg-black text-white p-2 hover:scale-95 hover:transition-transform duration-300">
                  <div className='text-xl font-bold'>{elem.title}</div>
                  <div className='text-sm'>{elem.description}</div>
                  <div className='flex justify-end'><button className='bg-red-500 p-1 text-sm text-white font-bold rounded-lg' onClick={()=>{
                    setDone(done.filter((_, index)=>{
                      return idx != index;
                    }))
                  }}>Delete</button></div>
                </div>
              })}
            </div>


          </div>
        </div>

      </div>

    </>
  )
}

export default App
