import React from "react";

 const FilmsList = (props) => {  
    return <><h1>Films List</h1>
                <div>
                    {props.films.map( (film, key) =>
                        <div key={key}  id={'div_' + key}>
                            Id: {film.id}<br/>
                            Title: {film.title} <br/>  
                            Director: {film.director} <br/>
                            <br/>
                        </div>
                    )}
                </div>
            </>;
  }
  
  export default FilmsList;