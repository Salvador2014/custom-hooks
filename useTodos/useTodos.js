import { useEffect, useReducer } from "react";
import { todoReducer } from "./todoReducer";


export const useTodos = ( initialState = [] ) => {
    const init = () => {
        // lo comente porque me tiraba error en el test
        // return JSON.parse( localStorage.getItem('todos') || [] ) 
        return JSON.parse( localStorage.getItem('todos') || '[]' )
    }
  
    const [ todos, dispatch ] = useReducer( todoReducer, initialState, init );

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify( todos ) );
    }, [todos])

    const handleNewTodo = ( todo ) => {
        const action = {
            type: '[TODO] add Todo',
            payload: todo,
        }
        dispatch( action );
    }

    const handleDeleteTodo = ( id ) => {
        dispatch({
            type: '[TODO] remove Todo',
            payload: id,
        });
    }

    const handleToggleodo = ( id ) => {
        dispatch({
            type: '[TODO] toggle Todo',
            payload: id,
        });
    }

    return {
        todos,
        handleNewTodo,
        handleDeleteTodo,
        handleToggleodo,
        todosCount: todos.length,
        pendingTodosCount: todos.filter( todo => !todo.done).length,
    }
}
