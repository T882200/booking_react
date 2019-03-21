import React,{ Component } from "react";
import Employee from "./Employee";
import moment from "moment";

export default class EmployeeRank extends Component{
    // Construct the component
    constructor(){
        super();
        
        this.state={
            arEmployees:[],
        }

        this.fetchAndRankEmployees("https://interview-booking-api.herokuapp.com/api/bookings")
    }
    
    

    
    
    // method that fetching employees object from API and rank it. using Fetch API and moment
    fetchAndRankEmployees(empURL) {
        // fetch full data from API
        fetch(empURL)
        // jsonify the data
        .then((res) => res.json())
        // take the raw data and sort him
        .then((rawData) => {
            
            // log the raw data for testing
            console.log("this is the raw data:", rawData);
            
            // init two data structurs for sorting
            const oEmployees={},arEmployees=[];
            
            // iterate trough the data, dnd use every order object
            rawData.forEach((item)=>{
                if (item.employee){
            
                    // shorthand for the seller
                    const emp=item.employee;
            
                    // calculate vacation delta hours, using moment.js
                    const delta = this.calcDelta(item.checkOutDate,item.checkInDate,"DD-MM-YYYY");
            
                    // check if employee isn't exist in the object
                    if (!oEmployees[emp.id]){
                        oEmployees[emp.id]={
                            ...emp,
                            delta:0,

                        }
                        // add calculated delta to the global delta of each
                        oEmployees[emp.id].delta+=delta;
                    }
                }
            });
            // push every employee in the previous object,to new array of employees
            for (const prop in oEmployees){
                arEmployees.push(oEmployees[prop]);
                
                // sorting the employees by global vacation hours - descendingly
                arEmployees.sort(function(a,b){
                    return b.delta-a.delta;
                })
            }
            
            // add the array of sorted employees to state
            this.setState({arEmployees:arEmployees});
            
            console.log("after sort - "+JSON.stringify(arEmployees));
        })
        // error catching
        .catch(function(err){
            console.log ("There is an error in fetching data in EmployeeRank component. -> ",err);
        });
    }
    
    // helper func for calc delta hours between checkin and checkout | TODO: make it even more reusable with switch statment
    calcDelta(a,b,format) {
        const del = (moment(a,format).valueOf()-
        moment(b,format).valueOf())/1000/60/60;
        return del;
    }
    
    
    // render the rank results to the page
    render(){
        return (
            <div style={styles.wrapper} onLoad={this.props.action}>
                <div style={styles.title}>Employee stats:</div>
                {
                    // map through any employee
                    this.state.arEmployees.map((EmployeeObject,index)=>{
                        if (index<3){
                        return (
                            <Employee 
                                key={index} 
                                name={EmployeeObject.firstName+" ."+EmployeeObject.lastName.substring(0,1)} 
                                pic={EmployeeObject.profileImageUrl} 
                                delta={EmployeeObject.delta}
                            />
                        );
                        } 
                        
                        else {
                            return null;
                        }
                    })
                }
            </div>
        )
    }
}





const styles = {
    wrapper:{
        color:"#fff",
        marginTop:"50px",
        marginLeft:"100px",
        marginRight:"100px"
    },
    emp:{
        color:"#fff",
    },
    title:{
        fontFamily:"Lato",
        fontSize:"20px",
        color:"#fff",
        margin:"2em 0",
        textAlign: "left"
    }

}