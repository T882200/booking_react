import React from "react";

// two props:
// caption = arbitrary caption
// data = data from high order component state

const HLData = (props)=>(
    <div>
        <div style={styles.data}>{props.data}</div>
        <div style={styles.caption}>{props.caption}</div>
    </div>
);

const styles = {
    data:{
        fontFamily:"Roboto",
        fontSize:"24px",
        color:"#fff"
    },
    caption:{
        fontFamily:"Lato",
        fontSize:"12px",
        color:"#72848b"
    }
};

export default HLData;