
import React, { useState} from "react";

import { socket }  from './socket';
import Login from './Login';
import Chat from './Chat';


const App = () =>{
    // const [ socket , setSocket ] = useState(null);
    const [ userName , setUserName] = useState("");

    return(
        <div>
            { !userName ?(
                <Login setUserName={setUserName}/>
            ):(
                <Chat userName={userName} />
            )  }

        </div>
    )
}


export default App;