import React from 'react';


    //Input:
    //liked:boolean
    //Output:
    //onClick 

    const Like = props => {
        let heartClass = "fa fa-heart";
        if(!props.liked) heartClass+="-o";

        return (
            <li className={heartClass} style ={{cursor:'pointer'}} onClick={props.onClick} aria-hidden="true"></li>
        );
    }
export default Like;