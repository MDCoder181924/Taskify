import {createContext , useContext , useState , useEffect} from 'react';
import api from '../api/axios'

const TaskContext = createContext();

export const TaskProvider = ({children}) =>{
    const [tasks , setTasks] = useState([]);
    const [loading , setLoading] = useState(true);

    const fetchTasks = async () => {
        try {
            const res = await api.get("/user/task/getTasks");
            setTasks(res.data.tasks);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(()=>{
        fetchTasks();
    },[]);

    return (
        <TaskContext.Provider value={{tasks, setTasks , loading , fetchTasks}}>
            {children}
        </TaskContext.Provider>
    )
}

export const useTask = () => useContext(TaskContext);
