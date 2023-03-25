import { useEffect } from 'react';
import { useApiRequest } from './hooks/userApiRequest';

type Todo = {
	userId: number;
	id: number;
	title: string;
	completed: boolean;
};

function App() {
	const { error, isLoaded, data, get } = useApiRequest<Todo[]>();

	useEffect(() => {
		get('https://jsonplaceholder.typicode.com/todos');
	}, [get]);

	if (error !== null) {
		return <div>Error: {error.message}</div>;
	} else if (!isLoaded) {
		return <div>Loading...</div>;
	}

	return (
		<ol>
			{(data as Todo[]).map((todo: Todo) => (
				<li key={todo.id}>
					<h2>{todo?.title}</h2>
					<p>{todo?.completed ? 'Completed' : 'Not Completed'}</p>
				</li>
			))}
		</ol>
	);
}

export default App;
