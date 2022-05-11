import Head from 'next/head';
import Image from 'next/image';
import React, { useState } from 'react';
import styles from '@/pages/index.module.css';
import TodoItem from '../components/TodoItem';

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export default function Home() {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [todoText, setTodoText] = useState('');

  function addTodoItem(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const newItem: Todo = {
      id: todoList.length + 1,
      text: todoText,
      completed: false,
    };
    console.log(newItem);
    setTodoList([...todoList, newItem]);
    setTodoText('');
  }

  function toggleCompleted(id: number) {
    const newState: Todo[] = todoList.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          completed: !item.completed,
        };
      } else {
        return item;
      }
    });
    setTodoList(newState);
  }

  function deleteSelf(id: number) {
    const newState = todoList.filter((item) => item.id !== id);

    setTodoList(newState);
  }
  return (
    <div className={styles.container}>
      <div>
        {todoList.map(({ id, text, completed }) => (
          <TodoItem
            key={id}
            text={text}
            completed={completed}
            id={id}
            toggleCompleted={toggleCompleted}
            deleteSelf={deleteSelf}
          />
        ))}
      </div>
      <form onSubmit={addTodoItem}>
        <p>Task:</p>
        <input
          data-testid="todo-input"
          type="text"
          onChange={(e) => {
            setTodoText(e.target.value);
          }}
          value={todoText}
        ></input>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
