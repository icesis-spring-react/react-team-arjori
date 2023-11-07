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
        
    }

    const inputClass=`"border border-gray-300 rounded-md py-2 px-3 focus:ring focus:border-blue-300 my-10"`
    return <>
      <h2>Add film</h2>
      <form onSubmit={guardar}>
      <label>Title:
      <input 
        type="text" 
        name="title" 
        value={inputs.title || ""} 
        onChange={cambiar} required
        className={inputClass}
      /><br />
      </label>

      <label>genre: 
        <input 
          type="text" 
          name="genre" 
          value={inputs.genre || ""} 
          onChange={cambiar} required
          className={inputClass}
        />
        </label>

        <label>Director:
      <input 
        type="text" 
        name="director" 
        value={inputs.director || ""} 
        onChange={cambiar} required
        className={inputClass}
      /><br />
      </label>

      <label>Release date:
      <input 
        type="date" 
        name="releaseDate" 
        value={inputs.releaseDate || ""} 
        onChange={cambiar} required
        className={inputClass}
      /><br />
      </label>
        <br />
        <input type="submit" value="Add film" className="bg-sky-700 p-1 hover:bg-sky-800 focus:outline-none text-white"/>
    </form>
            </>;
  };
  
  export default AddFilm;