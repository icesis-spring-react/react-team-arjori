import React, { useEffect, useState }  from 'react';
import FilmsList from '../components/FilmsList';
import AddFilm from '../components/AddFilm';
import EditFilm from '../components/EditFilm';
import DeleteFilm from '../components/DeleteFilm';
import FilterByDirector from '../components/FilterFilmByDirector'
import { useNavigate } from "react-router-dom";
import springApi from "../api";

export const Films = () => {
    const [display, setDisplay] = useState("")
    const [films, setFilms] = useState([])

    const navigate = useNavigate();

    const refresh=()=>{  window.location.reload();}
   
        useEffect(() => {
            const fetchFilms = async () => {
                try {
                    const { data } = await springApi.get("/films");
                    setFilms(data);
                } catch (error) {
                    console.log(error);
                }
            };
    
            fetchFilms();
          
        }, [setFilms]);
        const buttonClass=`relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white`

    return <>
    <a className="absolute top-0 left-0 m-5 font-medium text-blue-600 hover:underline" onClick={() => navigate("/home")}>Go back to Home</a>
                <h1 className="mt-8">Films</h1>
                <button onClick={() => setDisplay("Add")} className={buttonClass}>Add</button>
                <button onClick={() => setDisplay("Edit")} className={buttonClass}>Edit</button>
                <button onClick={() => setDisplay("Delete")} className={buttonClass}>Delete</button>
                <button onClick={() => setDisplay("Filter")} className={buttonClass}>Filter by Director</button>

                {display==="Add" && <AddFilm />}
                {display==="Edit" && <EditFilm  refresh={refresh}/>}
                {display==="Delete" && <DeleteFilm  refresh={refresh}/>}
                {display==="Filter" && <FilterByDirector setFilms={setFilms} refresh={refresh}/>}
                <hr />
                <FilmsList films={films} />
                
            </>;
}