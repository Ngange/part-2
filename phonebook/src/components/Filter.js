import React from "react";

const Filter = ({handleSearch}) => {
    return(
      <div>
      <span>filter shown with</span><input 
                    placeholder= 'Search....'
                    onChange={handleSearch}
                  />
      </div>
    )
  }

export default Filter