import React, { useEffect, useState }  from 'react';
import FilmsList from '../components/FilmsList';
import AddFilm from '../components/AddFilm';
import EditFilm from '../components/EditFilm';
import DeleteFilm from '../components/DeleteFilm';
import FilterByDirector from '../components/FilterFilmByDirector'
import springApi from "../api";

export const Films = () => {
    const [display, setDisplay] = useState("")
    const [films, setFilms] = useState([])

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
        

    return <>
                <h1>Films</h1>
                <button onClick={() => setDisplay("Add")}>Add</button>
                <button onClick={() => setDisplay("Edit")} >Edit</button>
                <button onClick={() => setDisplay("Delete")}>Delete</button>
                <button onClick={() => setDisplay("Filter")}>Filter by Director</button>

                {display==="Add" && <AddFilm />}
                {display==="Edit" && <EditFilm  refresh={refresh}/>}
                {display==="Delete" && <DeleteFilm  refresh={refresh}/>}
                {display==="Filter" && <FilterByDirector setFilms={setFilms} refresh={refresh}/>}
                <hr />
                <FilmsList films={films} />
                
            </>;
}