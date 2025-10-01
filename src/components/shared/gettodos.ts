import axios from "axios"


export interface PaginationData {
  todos: Todo[];
  has_next: boolean;
  has_prev: boolean;
  current_page: number;
  total_pages: number;
  total_items: number;
}

interface Todo {
    id: string;
    status: boolean;
    title: string;
}

export function createTodoApi(BASE_URL: string) {
  const instance = axios.create({ baseURL: BASE_URL });
  return {
    // Получить задачи
    fetchTodos: (page: number = 1, filter: string = "all") => {
      let status: boolean | undefined = undefined;
      if (filter === "complete") {
        status = true;
      } else if (filter === "uncomplete") {
        status = false;
      }
      return instance.get("", {
        params: {
          page,
          status,
        },
      });
    },

    // Изменить статус задачи
    updateStatus: (id: string, status: boolean) => {
      return instance.put(`status_update/${id}/`, {
       status
        // params: {
        //   status,
        // },
      });
    },

    // Удалить задачу
    deleteTodo: (id: string) => {
      return instance.delete(`delete/${id}/`);
    },

    // Создать задачу
    createTodo: (title: string) => {
      return instance.post("create", {
        title,
        status: false,
      });
    },
    // axios.post(`${BASE_URL}/create`, { title, status: false }),

    // Завершить все задачи
    completeAll: () => {
      return instance.put("complete_all/");
    },

    // Отменить завершение всех задач
    uncompleteAll: () => {
      return instance.put("uncomplete_all/");
    },

    // Удалить все задачи
    deleteAll: () =>  { 
      return instance.delete('delete_all/')
    },

    // Редактировать задачу
    editTodo: (id: string, title: string) =>
    {
      instance.put(`status_update/${id}/`, {title})
     }, //axios.put(`${BASE_URL}/status_update/${id}/`, { title }),
  };
}