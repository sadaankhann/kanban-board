import React, { useContext} from 'react'
import Board_1 from './components/Board_1';
import { TaskAndDiv } from './components/ShowTaskAndDiv';
import { TaskAndDescription } from './components/AddTaskAndAddTaskDescription';
import {Tasks} from './components/Task_Board_1'
import Board_2 from './components/Board_2';
import Board_3 from './components/Board_3';

const App = () => {

  const {tasks, setTasks} = useContext(Tasks);
  const {showTaskAddDiv, setShowTaskAddDiv} = useContext(TaskAndDiv);
  const {addTask, setAddTask, addTaskDescription, setAddTaskDescription} = useContext(TaskAndDescription);

  const formSubmitted = (e) => {

    setShowTaskAddDiv(false);

    e.preventDefault();
    setTasks([...tasks, { title: addTask, description: addTaskDescription }]);
    setAddTask("");
    setAddTaskDescription("");
  }

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
         
         <Board_1/>
         <Board_2/>
         <Board_3/>
        </div>

      </div>

    </>
  )
}

export default App
