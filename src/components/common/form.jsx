import React from "react";
import Joi from "joi-browser";
import Input from "./input";

class Form extends React.Component {
  state = {
    data: {},
    errors: {},
  };
  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };
  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const subschema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, subschema);
    return error ? error.details[0].message : null;
  };
  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data , errors});
  };
  handleSubmit = (e) => {
    e.preventDefault();
    //Call server
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    //save changes
    this.doSubmit();
  };
  renderButton(label) {
      return (
        <button disabled={this.validate()} className="btn btn-primary">{label}</button>
      ); 
  };
  renderInput(name,label,type="text"){
      const {data, errors} = this.state;

      return (
        <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
      );
  }
}

export default Form;
