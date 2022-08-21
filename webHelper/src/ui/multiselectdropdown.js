import React, {Component}  from "react";
import ReactDOM from "react-dom";
import  {colourOptions}  from "./multiselectdata";
import { default as ReactSelect } from "react-select";
import { components } from "react-select";
import '../pages/tickets/style.css'


const Option = (props) => {
 
  return (
    <>
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          feildName={'Status'} 
          size='large' 
          fullWidth={true}
          // value={props.value}
          // onChange={(e) => { 
          // //  updateFeildsColumns(e) 
          //   console.log(e.target.value)
          // }}
        />{" "}
        <label>{props.label}</label>
      </components.Option>
    </div>
  </>
    );
};
export default class MultiSelectt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionSelected: null
    };
  }
  handleChange = (selected) => {
   // console.log('==========================',selected)
    this.setState({
      optionSelected: selected
    });
    selected.forEach((e)=>{
      this.props.updateFeildsColumns(e.value, e.label)
    })
  };
  render() {
  
    console.log(this.props)
    return (
      <span
        className="d-inline css-2613qy-menu"
        data-toggle="popover"
        data-trigger="focus"
        data-content="Please select account(s)"
        placeholder="Choose"
        size='large' 
        fullWidth={true}
        
      >
        <ReactSelect
          options={colourOptions}
          isMulti
          closeMenuOnSelect={false}
          hideSelectedOptions={true}
          components={{
            Option
          }}
          onChange={this.handleChange}
          allowSelectAll={true}
          value={this.state.optionSelected}
        />
      </span>
    );
  }
}