import React from 'react';
import { withFormik, Field } from 'formik';
import * as yup from 'yup';

import { Form } from 'reactstrap';

import FieldInputComponent from '../FieldInputComponent';
import DateTimePickerField from '../DateTimePickerField';
import ButtonCustom from '../ButtonCustom';

const playerSchema = yup.object().shape({
    name: yup  
        .string()
        .required("Name can't be empty"),
    text: yup  
        .string()
        .required("Text can't be empty"),
});

const AddPostForm = props => {
    const {
        isSubmitting,
        handleSubmit,
        isValid,
        touched,
        errors,
        setFieldValue,
        values,
        setFieldError
    } = props;
    return (
        <Form className="add-player-form">
            <Field
                name="name"
                component={FieldInputComponent}
                error={touched.name && errors.name}
                type="text"
                label="Name"
                className="form-group"
                classInput="form-input"
            />
            <Field
                name="text"
                component={FieldInputComponent}
                error={touched.name && errors.name}
                type="text"
                label="Text"
                className="form-group"
                classInput="form-input"
            />
            <DateTimePickerField
                name="date"
                label="DateTimePicker"
                variant="outlined"
                setFieldValue={setFieldValue}
                value={values.date}
                formikError={errors.date}
                setFieldError={setFieldError}
                placeholder="Date of Birth (mm/dd/yyyy)"
            />


            {/* <Field
                name="time"
                component={FieldInputComponent}
                error={touched.name && errors.name}
                type="text"
                label="Time"
                className="form-group"
                classInput="form-input"
            />
            <Field
                name="date"
                component={FieldInputComponent}
                error={touched.name && errors.name}
                type="text"
                label="Date"
                className="form-group"
                classInput="form-input"
            /> */}
            <div className="order-form__btn">
                <ButtonCustom
                    className="order-form__btn_submit"
                    type="submit"
                    disabled={!isValid || isSubmitting}
                    onClick={handleSubmit}
                >
                    {isSubmitting ? 'Loading' : 'Add Post'}
                </ButtonCustom>
            </div>
        </Form>
    )
}

export default withFormik({
    mapPropsToValues: (props) => ({
      name: '',
      text: '',
      date: new Date(),
    }),
    isInitialValid: false,
    validationSchema: playerSchema,
    handleSubmit: async (values, { props, setSubmitting, resetForm }) => {
      await props.handleSubmit(values, setSubmitting, resetForm);
    },
  })(AddPostForm);