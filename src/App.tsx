import { useEffect, useState } from 'react';
import { useApiRequest } from './hooks/userApiRequest';

const BASE_URL = 'https://jsonplaceholder.typicode.com/todos';

type Todo = {
	userId: number;
	id: number;
	title: string;
	completed: boolean;
};

function App() {
	const { error, isLoaded, data, get, post, put, del } = useApiRequest<
		Todo[] | Todo
	>();

	const [newTodoTitle, setNewTodoTitle] = useState<string>('');

	useEffect(() => {
		get(BASE_URL);
	}, [get]);

	const handleNewTodoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setNewTodoTitle(event.target.value);
	};

	const handleNewTodoSubmit = async (
		event: React.FormEvent<HTMLFormElement>
	) => {
		event.preventDefault();
		const newTodo: Todo = {
			userId: 1,
			id: 201,
			title: newTodoTitle,
			completed: false
		};
		await post(BASE_URL, newTodo);
		setNewTodoTitle('');
	};

	const handleTodoUpdate = async (todo: Todo) => {
		const updatedTodo: Todo = { ...todo, completed: !todo.completed };
		await put(`${BASE_URL}/${todo.id}`, updatedTodo);
	};

	const handleTodoDelete = async (todo: Todo) => {
		await del(`${BASE_URL}/${todo.id}`);
	};

	if (error !== null) {
		return <div>Error: {error.message}</div>;
	} else if (!isLoaded) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<h2>Add a New Todo</h2>
			<form onSubmit={handleNewTodoSubmit}>
				<label>
					Title:
					<input
						type="text"
						value={newTodoTitle}
						onChange={handleNewTodoChange}
					/>
				</label>
				<button type="submit">Add</button>
			</form>

			<h2>Todos</h2>
			<ol>
				{(data as Todo[]).map((todo: Todo) => (
					<li key={todo.id}>
						<h2>{todo?.title}</h2>
						<p>{todo?.completed ? 'Completed' : 'Not Completed'}</p>
						<button onClick={() => handleTodoUpdate(todo)}>
							{todo?.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
						</button>
						<button onClick={() => handleTodoDelete(todo)}>Delete</button>
					</li>
				))}
			</ol>
		</>
	);
}

export default App;
