import React, { Component } from 'react';
import HLRooms from "./HLRooms";
import EmployeeRank from "./EmployeeRank";
// loading animation
import LoadingScreen from 'react-loading-screen';

// import EmployeeChart from "./EmployeeChart";
import './App.scss';

export default class App extends Component {
    constructor(){
        super();
        
        // Bind the this context to the handler function
        this.handler = this.handler.bind(this);
        
        // Set some state
        this.state={
            loading:true,
            messageShown: false
        }
    }
    // Loading handler - use to preview the loading screen
    // This method will be sent to the child component
    handler() {
        this.setState({
            loading: false
        });
        
        // console checing
        this.state.loading ? console.log("loading:Yes") : console.log("loading:No");
    }
    

    render() {
        // if(this.state.loading){
        //     console.log("loading...")
        //     return <ReactLoading type="balls" color="#000000" height={'20%'} width={'20%'} delay={5000} />
        // }
        
        return (
            <div className='app'>
                <LoadingScreen
                    loading={this.state.loading}
                    bgColor='#202b33'
                    spinnerColor='#9ee5f8'
                    textColor='#72848b'
                    text='Loading your booking app'
                >
                    <div className="page-content">
                        {/*component that present global info about rooms availability*/}
                        <HLRooms/>
                        <hr style={styles.hr} />
                        {/*component that present top 3 employees*/}
                        {/*Render the child component and set the action property with the handler as value*/}
                        <EmployeeRank action={this.handler} />
                        {/*<EmployeeChart/>*/}
                    </div>
                </LoadingScreen>
            </div>
        );
    }
}

const styles = {
    hr: {
        borderTop: ".5px solid",
        borderColor: "#72848b",
        width: "90%",
        marginTop: "50px"
    }


}
