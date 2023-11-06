import React, { useState }  from 'react';
import FilmsList from "../components/FilmsList";
import axios from "axios";

const baseURL = "http://localhost:8080/films";

const Films = () => {
    const [display, setDisplay] = useState("")
    const [filmSelected, setFilm] = useState({})
    const [films, setFilms] = useState([])

    const listar = () => {
            const token = localStorage.token;

            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            axios.get(baseURL, config).then((response) => {
                setFilms( response.data );
            });
        }
        
    React.useEffect(() => {
        listar();
    }, [])

    return <>
                <h1>Films</h1>
                <button onClick={() => setDisplay("Add")}>Adicionar</button>
                <button onClick={() => setDisplay("Editar")} >Editar</button>
                <button onClick={() => setDisplay("Borrar")}>Borrar</button>

                {/* {display==="Add" && <AddFilm listar={listar} />} */}
                {/* {display==="Editar" && <EditStudent setStudent={setStudent} studentSelected={studentSelected} listar={listar}  />} */}
                {/* {display==="Borrar" && <RemoveStudent studentSelected={studentSelected} listar={listar}  />} */}
                <hr />
                <FilmsList setFilm={setFilm} films={films} filmSelected={filmSelected} />
            </>;
  }
  
  export default Films;