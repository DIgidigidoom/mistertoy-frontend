import { useEffect, useRef, useState } from "react"
import { toyService } from "../services/toy.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { saveToy } from "../store/actions/toy.actions.js"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button, TextField } from '@mui/material';

export function ToyEdit() {

    const navigate = useNavigate()
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const { toyId } = useParams()

    const SignupSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        price: Yup.number()
            .min(0, 'Must be 0 or more')
            .required('Required'),
    })

    function formValidationClass(errors, touched) {
        const isError = !!Object.keys(errors).length
        const isTouched = !!Object.keys(touched).length
        if (!isTouched) return ''
        return isError ? 'error' : 'valid'
    }

    function CustomInput(props) {
        return (
            <TextField {...props} id="standard-basic" variant="standard" />
        )
    }


    useEffect(() => {
        if (toyId) loadCar()
    }, [])

    function loadCar() {
        toyService.getById(toyId)
            .then(toy => setToyToEdit(toy))
            .catch(err => {
                console.log('Had issues in toy edit', err)
                navigate('/toy')
            })
    }


    function onSaveToy(values) {
        if (!values.price) values.price = 150
        saveToy(values)
            .then(() => {
                showSuccessMsg('Toy Saved!')
                navigate('/toy')
            })
            .catch(err => {
                console.log('Had issues in toy details', err)
                showErrorMsg('Had issues in toy details')
            })
    }

    const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']
    return (

        <Formik
            initialValues={{
                name: '',
                price: '',

            }}
            validationSchema={SignupSchema}
            onSubmit={(values) => {
                onSaveToy(values)
            }}
        >
            {({ errors, touched, dirty }) => {
                const validationClass = formValidationClass(errors, touched)
                return (
                    <Form className={`formik ${validationClass}`}>

                        <label htmlFor="name"></label>
                        <Field as={CustomInput} id="name" name="name" label="Name..." />
                        {errors.name && touched.name && (
                            <div className="errors">{errors.name}</div>
                        )}

                        <label htmlFor="price"></label>
                        <Field as={CustomInput} id="price" name="price" label="Price.." />
                        {errors.price && touched.price && (
                            <div className="errors">{errors.price}</div>
                        )}

                        <div id="checkbox-group">Labels</div>
                        <div role="group" aria-labelledby="checkbox-group">
                            {labels.map(label => (
                                <label key={label}>
                                    <Field type="checkbox" name="labels" value={label} />
                                    {label}
                                </label>
                            ))}
                        </div>
                        <button type="submit" >{toyToEdit._id ? 'Save' : 'Add'}</button>
                        <button onClick={() => navigate('/toy')}>Back</button>
                    </Form>
                )
            }}
        </Formik>
    )

}