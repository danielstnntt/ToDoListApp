import React from "react";

export default function ToDo( { todo, toggleTodo } )
{
    function handleToDoClick()
    {
        toggleTodo(todo.id)
    }
    return (
        <div>
            <label>
                <input type="checkbox" checked={todo.completed} 
                onChange={handleToDoClick} />
                { todo.name }
            </label>
        </div>
    )
}