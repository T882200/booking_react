import React,{Component} from "react";
import HLData from "./HLData";

export default class HLRooms extends Component{
    constructor(){
        super();
        this.state={
            availableRooms:0,
            reservedRooms:0,
            checkedIn:0
        };
        
        const self=this;
        fetch("https://interview-booking-api.herokuapp.com/api/booking-snapshot")
        .then ( res => res.json())
        .then((json) => {
            self.setState({availableRooms:json.availableRooms,
                          reservedRooms:json.reservedRooms,
                          checkedIn:json.checkedIn});
            // check the data json structure
            console.log ("json is = ",JSON.stringify(json));
        })
        .catch((err) => {
            console.log("error: $",err);
        });
    }
    render(){
        return (
            <div style={styles.container_}>
                <HLData caption="Rooms available" data={this.state.availableRooms}/>
                <HLData caption="Reserved rooms" data={this.state.reservedRooms}/>
                <HLData caption="Checked in" data={this.state.checkedIn}/>
            </div>
        );
    }

}

const styles={
    container_:{
        display:"flex",
        justifyContent:"space-between",
        marginLeft:"100px",
        marginRight:"100px"
    }
}