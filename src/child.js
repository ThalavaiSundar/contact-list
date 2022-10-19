import React, { useState } from 'react';

 const Child = (props)=>{

    const [greet, setGreet]=useState("All is well")

    const handleClick = ()=>{
        props.getGreetFromChild(greet)
    }

    return(
        <>
            <h1>Child Component</h1>
            <p>Message From Parent:{props.msg}</p>
            <button onClick={handleClick}>Send Greet</button>
        </>
    )
}

export default Child ;