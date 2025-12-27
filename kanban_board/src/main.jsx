import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ShowTaskAndDiv from './components/ShowTaskAndDiv.jsx';
import AddTaskAndAddTaskDescription from './components/AddTaskAndAddTaskDescription.jsx';
import Task_Board_1 from './components/Task_Board_1.jsx'
import IndAndVal_ from './components/IndexAndValue.jsx';
import InProgress_Board_2 from './components/InProgress_Board_2.jsx';


createRoot(document.getElementById('root')).render(

  <InProgress_Board_2>
    <IndAndVal_>
      <Task_Board_1>
        <ShowTaskAndDiv>
          <AddTaskAndAddTaskDescription>
            <App />
          </AddTaskAndAddTaskDescription>
        </ShowTaskAndDiv>
      </Task_Board_1>
    </IndAndVal_>
  </InProgress_Board_2>
)
