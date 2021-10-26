import React from "react";

const Persons = ({filtered, remove}) => {
    return(
      filtered.map(person => 
        <p key={person.id}>
          {person.name} {person.number}
          <button className="delete" onClick={() => remove(person.id, person.name)}>delete</button> 
        </p>
        )
    )
  }

  export default Persons