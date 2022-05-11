import React from 'react';

type TodoProps = {
  id: number;
  text: string;
  completed: boolean;
  toggleCompleted: any;
  deleteSelf: any;
};

const TodoItem = (props: TodoProps) => {
  const style = {
    textDecoration: props.completed ? 'line-through' : 'none',
  };

  const style2 = {
    padding: '10px',
  };

  return (
    <div style={style2}>
      <span style={style}>{props.text}</span>
      <input
        type="checkbox"
        onChange={() => {
          props.toggleCompleted(props.id);
        }}
      ></input>
      <button
        onClick={() => {
          props.deleteSelf(props.id);
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default TodoItem;
