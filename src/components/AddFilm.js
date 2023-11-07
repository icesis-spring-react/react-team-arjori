import React , {useState} from "react";
import springApi from "../api";

const AddFilm = () => {

    const [inputs, setInputs] = useState({});
    
    const cambiar = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }
    
    const guardar = async (event) => {
        event.preventDefault();
        // console.log(inputs);

        let film = {
            title: inputs.title,
            genre: inputs.genre,
            director: inputs.director,
            releaseDate: inputs.releaseDate
        }

        try {
            await springApi.post("/film",film);
        } catch (error) {
            console.log(error);
        }
        /* axios.post(baseURL, student).then((response) => {
            console.log("Film added");
            props.listar();    
        }); */
    }

    return <>
      <h2>Add film</h2>
      <form onSubmit={guardar}>
      <label>Title:
      <input 
        type="text" 
        name="title" 
        value={inputs.title || ""} 
        onChange={cambiar} required
      /><br />
      </label>

      <label>genre: 
        <input 
          type="text" 
          name="genre" 
          value={inputs.genre || ""} 
          onChange={cambiar} required
        />
        </label>

        <label>Director:
      <input 
        type="text" 
        name="director" 
        value={inputs.director || ""} 
        onChange={cambiar} required
      /><br />
      </label>

      <label>Release date:
      <input 
        type="date" 
        name="releaseDate" 
        value={inputs.releaseDate || ""} 
        onChange={cambiar} required
      /><br />
      </label>
        <br />
        <input type="submit" value="Add film" />
    </form>
            </>;
  };
  
  export default AddFilm;