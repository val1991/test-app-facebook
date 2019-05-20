import React, { useState } from "react";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import './styles.css';

const DateTimePickerField = (props) => {
    const [isTouched, setIsTouched] = useState(false)

    const handleDateChange = (selectedDate) => {
        props.setFieldValue('date', selectedDate); 
    }

    const {
        variant,
        placeholder,
        name,
        value,
        formikError,
        label,
    } = props;
    const showError = formikError && isTouched;
    return(
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div className='date-wrapper'>
                <DateTimePicker
                    error={!!showError}
                    label={label}
                    onClose={() => setIsTouched(true)}
                    value={value}
                    onChange={handleDateChange}
                    name={name}
                    placeholder={placeholder}
                    inputVariant={variant}
                />
                {showError ? <div className="input-feedback">{formikError}</div> : null}
            </div>
        </MuiPickersUtilsProvider>
    )
}

export default DateTimePickerField;