import React, {Component} from 'react';
const mainFunc = (Data) => {
    class MainData extends Component{
        constructor(props){
            super(props)
        }
        render(){
            return <Data />
        }
    }
    return MainData;
}
export default mainFunc;