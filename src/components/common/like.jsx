import React from 'react';


    //Input:
    //liked:boolean
    //Output:
    //onClick 

    const Like = ({liked,onClick}) => {
        let heartClass = "fa fa-heart";
        if(!liked) heartClass+="-o";

        return (
            <li className={heartClass} style ={{cursor:'pointer'}} onClick={onClick} aria-hidden="true"></li>
        );
    }
export default Like;