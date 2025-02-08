import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [newTask, setNewTask] = useState({
    id: uuidv4(),
    des: "",
    isCompleted: false,
  });
  const [taskList, setTaskList] = useState([]);
  const [showInCompleted, setShowInCompleted] = useState(true);

  useEffect(() => {
    let tasks = JSON.parse(localStorage.getItem("Tasks"));
    if (tasks) {
      setTaskList(tasks);
    }
  }, []);

  useEffect(() => {
    if (taskList.length > 0) {
      localStorage.setItem("Tasks", JSON.stringify(taskList));
    }
  }, [taskList]);

  const onChangeCheckboxHandler = (e) => {
    let index = taskList.findIndex((items) => {
      return e.target.id === items.id;
    });
    let prev = taskList[index].isCompleted;
    let taskListTemp = [...taskList];
    taskListTemp[index].isCompleted = !prev;
    setTaskList(taskListTemp);
  };

  const handleAddTask = (e) => {
    let taskListTemp = [...taskList];
    if (newTask.des != "") {
      taskListTemp.push(newTask);
      setTaskList(taskListTemp);
      setNewTask({
        id: uuidv4(),
        des: "",
        isCompleted: false,
      });
    }
  };
  const handleDelete = (id,cnfReq) => {
    let cnf
    if(cnfReq){
      cnf = confirm("Are you sure you want to delete this task?");
    }
    else{
      cnf = true;
    }
    if (cnf) {
      let taskListTemp = taskList.filter((taskToDelete) => {
        return taskToDelete.id !== id;
      });
      setTaskList(taskListTemp);
    }
  };
  const handleEdit = (id) => {
    let newTaskTemp = {...newTask};
    let index = taskList.findIndex((items)=>{
      return items.id === id;
    })
    newTaskTemp.des = taskList[index].des;
    setNewTask(newTaskTemp)
    handleDelete(id,false)
  };

  const showInCompletedHandler =()=>{
    setShowInCompleted(!showInCompleted)
  }

  return (
    <>
      <Navbar />
      <div className="w-3xl m-auto bg-[#252525] h-[85vh] mt-2 rounded-lg flex flex-col pb-4">
        <div className="newTodo w-full">
          <h2 className="text-xl font-bold my-1 mx-4 text-center text-emerald-50">
            Add New Task
          </h2>
          <div className="flex justify-evenly items-center mt-4">
            <input
              type="text"
              value={newTask.des}
              onChange={(e) => {
                let taskTemp = { ...newTask };
                taskTemp.des = e.target.value;
                setNewTask(taskTemp);
              }}
              placeholder="Create a New Task"
              className="bg-[#2f2f2f] px-4 py-2 m-auto w-full mx-3 rounded-2xl outline-0"
            />
            <button
              className="bg-emerald-600 px-4 py-2 m-auto mr-3 rounded-2xl font-bold hover:bg-emerald-700 cursor-pointer"
              onClick={handleAddTask}
            >
              Add
            </button>
          </div>
        </div>

        <div className="allTasks">
          <h2 className="text-xl font-bold my-6 mx-4 text-center text-emerald-50">
            My Tasks
          </h2>
          {taskList.length === 0 && (
            <div className="text-gray-400 text-center">
              No Tasks Yet...Add some tasks
            </div>
          )}
          {taskList.length !== 0 && (
            <div className="flex gap-6 mb-4 items-center">
              <input
                  type="checkbox"
                  className="ml-4 size-4 accent-emerald-700 outline-0"
                  onChange={showInCompletedHandler}
                  checked={showInCompleted}
                />
                <span>Show Incompleted</span>
            </div>
          )}


          {taskList.map((task) =>((!showInCompleted || !(task.isCompleted)) &&
            <div className="taskCard" key={task.id}>
              <div className="flex justify-evenly items-center mt-2">
                <input
                  type="checkbox"
                  name="task"
                  id={task.id}
                  className="ml-4 size-6 accent-emerald-700 outline-0"
                  onChange={onChangeCheckboxHandler}
                  checked={task.isCompleted}
                />
                <input
                  type="text"
                  value={task.des}
                  onChange={() => {}}
                  className={`bg-[#2f2f2f] px-4 py-2 m-auto w-full mx-3 rounded-2xl outline-0 ${
                    task.isCompleted ? "line-through" : ""
                  }`}
                  readOnly
                  disabled
                />
                <button className="bg-red-700 px-4 py-2 m-auto mr-3 rounded-2xl font-bold hover:bg-red-800 cursor-pointer"
                onClick={()=>handleEdit(task.id)}>
                  Edit
                </button>
                <button
                  onClick={() => {
                    handleDelete(task.id,true);
                  }}
                  className="bg-red-700 px-4 py-2 m-auto mr-3 rounded-2xl font-bold hover:bg-red-800 cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}




          
        </div>
      </div>
    </>
  );
}

export default App;
