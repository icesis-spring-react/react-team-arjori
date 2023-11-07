import React , {useState} from "react";
import springApi from "../api";

const FilterByDirector = (props) => {

    const [inputs, setInputs] = useState({});
    
    const cambiar = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }
    
    const filterFilms = async (event) => {
        event.preventDefault();
        try {
            await springApi.get("/directors/"+inputs.ident+"/films").then((response)=>{
                if(response.status==200)
                    props.setFilms(response.data)
                // props.refresh()    
            });
        } catch (error) {
            console.log(error);
        }
        
    }


    
    const inputClass=`"border border-gray-300 rounded-md py-2 px-3 focus:ring focus:border-blue-300 my-10"`
    return <>
      <h2>Edit film</h2>
      <form onSubmit={filterFilms}>
      <label>Enter the ID of the director you want to filter films by:
      <input 
        type="number" 
        name="ident" 
        value={inputs.ident || ""} 
        onChange={cambiar} required
        className={inputClass}
      /><br />
      </label>  
      <input type="submit" value="Filter" className="bg-sky-700 p-1 hover:bg-sky-800 focus:outline-none text-white" />
      </form>
            </>;
  };
  
  export default FilterByDirector;