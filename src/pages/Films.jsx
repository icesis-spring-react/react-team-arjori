import React, { useEffect, useState }  from 'react';
import FilmsList from '../components/FilmsList';
import AddFilm from '../components/AddFilm';
import EditFilm from '../components/EditFilm';
import DeleteFilm from '../components/DeleteFilm';
import springApi from "../api";

// const baseURL = "http://localhost:8080/films";

const Films = (props) => {
    const [display, setDisplay] = useState("")
    const [films, setFilms] = useState([])

    const refresh=()=>{  window.location.reload();}
    /* const listar = () => {
            const token = localStorage.token;

            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            axios.get(baseURL, config).then((response) => {
                setFilms( response.data );
            });
        } */
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

                {display==="Add" && <AddFilm />}
                {/* {display==="Editar" && <EditFilm  setFoundFilm={setFoundFilm}/>} */}
                {display==="Edit" && <EditFilm  refresh={refresh}/>}
                {display==="Delete" && <DeleteFilm   />}
                <hr />
                <FilmsList films={films} />
                
            </>;
  }
  
  export default Films;