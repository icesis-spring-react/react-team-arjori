import React , {useState} from "react";
import springApi from "../api";

const EditFilm = (props) => {

    const [inputs, setInputs] = useState({});
    const [foundFilm,setFoundFilm]=useState({});
    const editForm = document.getElementById("editForm");
    
    const cambiar = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }
    
    const getFilm = async (event) => {
        event.preventDefault();
        try {
            await springApi.get("/film/"+inputs.ident).then((response)=>{
                setFoundFilm(response.data)
                // console.log(foundFilm)
                if (Object.keys(foundFilm).length > 0) {
                    editForm.style.display = "block";
                    setData()    
                    // console.log(inputs)            
                }    
            });
        } catch (error) {
            console.log(error);
        }
        
    }

    const setData = () => {
        inputs.title=foundFilm.title
        inputs.genre=foundFilm.genre
        inputs.director=foundFilm.director
        inputs.releaseDate=foundFilm.releaseDate
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
        // console.log(film)
        try {
            await springApi.put("/film/"+foundFilm.id,film);
            props.refresh();
        } catch (error) {
            console.log(error);
        }
    }

    return <>
      <h2>Edit film</h2>
      <form onSubmit={getFilm}>
      <label>Enter the ID of the film you want to edit:
      <input 
        type="number" 
        name="ident" 
        value={inputs.ident || ""} 
        onChange={cambiar} required
      /><br />
      </label>  
      <input type="submit" value="Get film" />
      </form>


      <form onSubmit={guardar} id="editForm" style={{ display: "none" }}>
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
        <input type="submit" value="Save film" />
    </form>
            </>;
  };
  
  export default EditFilm;