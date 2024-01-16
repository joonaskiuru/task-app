import { createContext } from "react";

export const TaskUpdate = createContext({
    taskUpdate: false,
    setTaskUpdate: () => {}
  });

  export const ActiveTasks = createContext({
    activeTasks: 0,
    setActiveTasks: () => {}
  });


