import { useEffect, useState } from "react";
import springApi from "../api";

export const Directors = () => {
	const [directorsList, setDirectorsList] = useState([]);
	const [selected, setSelected] = useState(-1);
	const [newDirector, setNewDirector] = useState("");

	useEffect(() => {
		const fetchDirectors = async () => {
			try {
				const { data } = await springApi.get("/directors");
				setDirectorsList(data);
			} catch (error) {
				console.log(error);
			}
		};

		fetchDirectors();
	}, []);

	const handleEdit = async (director, selected) => {
		if (director.name === "") return; 

		selected === director.id ? setSelected(-1) : setSelected(director.id);

		if (selected === director.id) {
			try {
				console.log("aaaaaa");
				await springApi.put(`/director/${director.id}`, director);
			} catch (error) {
				console.log(error);
			}
		}
	}

	const handleDelete = async (director) => {
		try {
			await springApi.delete(`/director/${director.id}`);
		} catch (error) {
			console.log(error);
		}
	}

	const handleAdd = async () => {
		if (newDirector === "") return;

		const director = {
			name: newDirector
		};

		try {
			await springApi.post("/director", director);
		} catch (error) {
			console.log(error);
		}
	}

  	return (
		<div className="relative overflow-x-auto shadow-md w-64">
			<table className="w-full text-sm text-center">
				<thead className="text-x uppercase bg-gray-400">
					<tr>
						<th className="p-2">
							Name
						</th>
						<th className="p-2">
							Action
						</th>
					</tr>
				</thead>

				<tbody className="bg-gray-200">
					{directorsList.map((director) => {
						return (
							<tr className="border-b hover:bg-gray-300" key={director.id}>
								<td className="p-2">
									<input
										type="text"
										className="w-full focus:outline-none"
										disabled={selected !== director.id}
										defaultValue={director.name}
										onChange={(e) => {
											director.name = e.target.value;
										}}
									/>
								</td>
								<td className="flex items-center p-2 space-x-3">
									<a href="#" className="font-medium text-blue-600 hover:underline" onClick={() => handleEdit(director, selected)}>
										{selected !== director.id ? "Edit" : "Save"}
									</a>
									<a href="#" className="font-medium text-red-600 hover:underline" onClick={() => handleDelete(director)}>Remove</a>
								</td>
							</tr>
						);
					})}
					<tr className="border-b hover:bg-gray-300">
						<td className="p-2">
							<input type="text" className="w-full focus:outline-none" placeholder="Add new director" 
								onChange={(e) => setNewDirector(e.target.value)} />
						</td>
						<td className="flex items-center p-2 space-x-3">
							<a href="#" className="font-medium text-green-600 hover:underline" onClick={() => handleAdd()}>Add</a>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
)};
