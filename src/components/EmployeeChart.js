import React from "react";
import { PieChart } from 'react-charts-d3'; 
import moment from "moment";
import env from '../env';
// this component comes with these props:
// props.pic = employee picture (fetched from the api)
// props.deltaInHours = employee delta Hours sum (fetched from the api)
// props.name = employee name (fetched from the api)

const EmployeeChart = (props)=>{
    
        // fetch full data from API
        const arrayData = () => {
        fetch(env.API_URL)
        // jsonify the data
        .then((res) => res.json())
        // take the raw data and sort him
        .then((rawData) => {
            // init two data structurs for sorting
            const oEmployees={},arEmployees=[];
            // iterate trough the data, and use every order object
            rawData.forEach((item)=>{
                if (item.employee){
            
                    // shorthand for the seller
                    const emp=item.employee;
            
                    // calculate vacation delta hours, using moment.js
                    const delta = (moment(item.checkOutDate,"DD-MM-YYYY").valueOf()-
                    moment(item.checkInDate,"DD-MM-YYYY").valueOf())/1000/60/60;    
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
            
            return arEmployees;
        });
        }
        var chartData = []
        
        arrayData.forEach((element) => {
          chartData.push({label: `${element.firstName} ${element.lastName}`, value: element.delta})
        });
        
    return (
            <PieChart data={chartData} />
    )
};


export default EmployeeChart;