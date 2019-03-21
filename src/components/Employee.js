import React from "react";

// this component comes with these props:
// props.pic = employee picture (fetched from the api)
// props.deltaInHours = employee delta Hours sum (fetched from the api)
// props.name = employee name (fetched from the api)

const Employee = (props)=>(
    <div style={styles.record}>
        <img alt="" style={styles.profileImg} src={props.pic}/>
        <span style={{...styles.padding}}>{props.name}</span>
        <span style={styles.delta}>{props.delta} hours</span>
    </div>
);
const styles = {
    profileImg:{
        width:"40px",
        height:"40px",
        borderRadius: "50%"
    },
    record:{
        display:"flex",
        alignItems:"center",
        padding:"1em"
    },
    padding:{
        paddingLeft:"2em",
        paddingRight:"2em"
    },
    delta:{
        color: "#72848b"
    }

}
export default Employee;