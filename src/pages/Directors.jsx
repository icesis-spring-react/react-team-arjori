import { useEffect, useState } from "react";
import springApi from "../api";

export const Directors = () => {
	const [directorsList, setDirectorsList] = useState([]);

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
	  
	}, [setDirectorsList]);

  	return <table className="table-fixed">
		<thead>
			<tr>
				<th>Name</th>
			</tr>
		</thead>

		<tbody>
			{directorsList.map((director) => {
				return (
					<tr key={director.name}>
						<td>{director.name}</td>
					</tr>
				);
			})}
		</tbody>
	</table>;
};
