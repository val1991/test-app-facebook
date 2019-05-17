import React, { Component } from 'react';
import classnames from 'classnames';
import { FormGroup, Label, Input } from 'reactstrap';

export default class FieldInputComponent extends Component {
  render() {
    const {
      field,
      form: { touched, errors },
      className,
      label,
      error,
      classInput,
      type,
      placeholder,
      value,
      onChange,
      id,
      ...props
    } = this.props;
    const showError = touched[field.name] && errors[field.name];

    return (
        <FormGroup className={classnames(className, { 'animated shake error': !!error })}>
            <div className="form-group__top">
                {label && (
                    <Label for={id} className="form-group__label">
                        {label}
                    </Label>
                )}
            </div>
            <Input
                className={classInput}
                type={type}
                id={id}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                {...props}
                {...field}
            />
            {showError && errors[field.name] ? <div className="input-feedback">{errors[field.name]}</div> : null}
        </FormGroup>
    );
  }
}