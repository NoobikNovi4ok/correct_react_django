import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { HiXMark } from "react-icons/hi2";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [name, setName] = useState("");
  const [editStatus, setEditStatus] = useState(false);
  const [editName, setEditName] = useState("");
  const [editTodo, setEditTodo] = useState();
  const [openEditUI, setOpenEditUI] = useState(true);

  const addTodoHandler = () => {
    const postTodo = async () => {
      try {
        const postTodoData = {
          name: name,
        };
        const { data } = await axios.post(
          "http://127.0.0.1:8000/todos",
          postTodoData
        );
        setTodos([data, ...todos]);
        setName("");
      } catch (error) {
        console.error("Error adding todo:", error);
      }
    };
    postTodo();
  };

  const deleteTodoHandler = (id) => {
    const deleteTodo = async () => {
      try {
        await axios.delete(`http://127.0.0.1:8000/todos/${id}`);
        setTodos(todos.filter((t) => t.id !== id));
      } catch (error) {
        console.error("Error deleting todo with id:", id);
      }
    };
    deleteTodo();
  };

  const editTodoHandler = (id) => {
    const updatePatchTodo = async () => {
      const UpdateData = {
        name: editName,
        status: editStatus,
      };
      const { data } = await axios.patch(
        `http://127.0.0.1:8000/todos/${id}`,
        UpdateData
      );
      const updatedTodos = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, name: editName, status: editStatus };
        }
        return todo;
      });
      setTodos(updatedTodos);
      setEditTodo();
      setEditName("");
      setEditStatus(false);
      setOpenEditUI(false);
    };
    updatePatchTodo();
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const { data } = await axios.get("http://127.0.0.1:8000/todos");
        setTodos(data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    fetchTodos();
  }, []);
  return (
    <div className="bg-dark text-white vh-100 position-relative">
      <div className="d-flex flex-column w-100 p-5">
        <h1 className="display-4 text-center mb-4">Todo App</h1>
        <div className="d-flex align-items-center justify-content-between bg-secondary rounded p-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="form-control"
            placeholder="Add a new todo..."
          />
          <button
            onClick={addTodoHandler}
            className="btn btn-primary btn-lg mx-3"
          >
            Add
          </button>
        </div>
        <div className="d-flex flex-wrap justify-content-evenly">
          {todos?.map((todo, index) => (
            <div
              key={todo.id}
              className="d-flex justify-content-between align-items-center my-2 p-3 
              border border-3 border-dark rounded-2 
              col-lg-3 bg-warning text-dark"
              onClick={() => {
                setEditStatus(todo.status);
                setEditName(todo.name);
                setEditTodo(todo.id);
                setOpenEditUI(true);
              }}
            >
              <input type="checkbox" checked={todo.status} />
              <span className="ml-3">{todo.name}</span>
              <button
                onClick={() => deleteTodoHandler(todo.id)}
                className="btn btn-outline-danger border-1 border-dark  mx-2"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        <div
          className={`d-flex flex-wrap text-center align-items-center col-lg-3 p-3 mx-auto border border-2 border-dark rounded ${
            openEditUI ? "bg-warning bg-gradient text-dark" : "d-none"
          } `}
        >
          <div className="row w-100 justify-content-between mx-0">
            <div className="col-lg-11 p-0">
              <p className="m-0 h4">Edit todos</p>
            </div>
            <div className="col-lg-1">
              <HiXMark className="" onClick={() => setOpenEditUI(false)} />
            </div>
          </div>
          <div className="w-25 row my-3 p-2 bg-light mx-0 rounded border border-2 border-dark">
            <div className="col-lg-1 my-auto">
              <input
                type="checkbox"
                checked={editStatus}
                onChange={() => setEditStatus(!editStatus)}
              />
            </div>
            <div className="col-lg-1 my-auto">
              <p className="my-auto">Status</p>
            </div>
          </div>
          <input
            type="text"
            className="w-100 my-2 px-3 py-2 bg-dark text-light border border-2 border-success"
            placeholder="Change name..."
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
          <button
            className="btn btn-success mx-auto border border-1 border-dark"
            onClick={() => editTodoHandler(editTodo)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
