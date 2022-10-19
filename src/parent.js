import React, { useState } from 'react';
import Child from './Child';

 const Parent = ()=>{

    const [greet, setGreet]=useState("")

    const handleCallback = (data)=>{
        setGreet(data)
    }

    return(
        <>
            <h1>Parent Component</h1>
            <p>Message From Child:{greet}</p>
            <Child msg="Good Morning" getGreetFromChild={handleCallback} />
        </>
    )
}

export default Parent ;
