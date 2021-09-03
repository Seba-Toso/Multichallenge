import React from 'react';
import {useHistory} from 'react-router-dom'
import { usePersistedContext } from 'react-persist-context'
import { Formik, Field, Form } from 'formik';
import * as Yup from "yup";
import * as Ricons from 'react-icons/gr'

import { login, searchHero } from '../services/formSubmits'
import '../styles/forms.scss'

const Validations = (type) => {
	return type === 'login' ?
		Yup.object().shape({
			email: Yup.string()
				.email('Invalid email')
				.min(2, 'Too Short!')
				.max(20, 'Too Long!')
				.required('Required')
				.matches('challenge@alkemy.org', 'Noup'),
			password: Yup.string()
				.min(2, 'Too Short!')
				.max(10, 'Too Long!')
				.required('Required')
				.matches('react', 'Double Noup'),
		})
		:
		Yup.object().shape({			
			name: Yup.string()
				.min(1, 'Too Short!')
				.max(20, 'Too Long!'),
			id:	Yup.number()
				.min(1, 'Too Short!')
				.max(731, 'Too Long!')
				.positive('ID has to be a positive number')
		})
}

const Forms = ({...fields}) => {
	const { state, dispatch } = usePersistedContext()
	const history = useHistory()
	
	const handleSubmit = (values) => {
		if(fields.type === 'login'){
			dispatch({type: 'LOGGIN'})
			login(values.email, values.password)
			.then(() => {
				dispatch({type: 'LOGIN_SUCCESS', payload: true})
				history.push('/Alkemy_Superhero')
			})
		}
		if(fields.type === 'search'){
			dispatch({type: 'GET_HEROES'})
			searchHero(values.name, values.id)
			.then((result)=>{
				dispatch({type: 'GET_HEROES_SUCCESS', payload: result})
				fields.setFindedHeros(result)
			})
		}
	}

	return(
    <Formik
    initialValues={{
        email: '',
        password: '',
				id: '',
				name: '',
    }}
    validationSchema={Validations(fields.type)}
    onSubmit={async (values) => {handleSubmit(values)}}
    >
    {({ errors, touched }) => (
    <Form className='form'>

				{
					fields.email && 
					<>
					<div className='d-flex justify-content-between'>
						<label htmlFor="email" className='form-label mt-2'>Email</label>
						{
							errors.email && touched.email ? 
							<p className='form-label mt-2 error'>{errors.email }</p>
							: 
							null
						}
					</div>
					<Field
					id="email"
					name="email"
					placeholder=""
					type="email"
					className='form-control'
					style={
						errors.email && touched.email ? {border: '1px solid crimson', backgroundColor: '#ed143d30'} : 
						!errors.email && touched.email ? {border: '1px solid green', backgroundColor: '#00800030'} :
						{border: '1px solid gray'}
					}
					/>
					</>
				}

				{
					fields.password && 
					<>
					<div className='d-flex justify-content-between'>
						<label htmlFor="password" className='form-label mt-2'>Password</label>
						{
							errors.password && touched.password ? 
							<p className='form-label mt-2 error'>{errors.password }</p>
							: 
							null
						}
					</div>
					<Field
					id="password"
					name="password"
					placeholder=""
					type="password"
					className='form-control'
					style={
						errors.password && touched.password ? {border: '1px solid crimson', backgroundColor: '#ed143d30'} : 
						!errors.password && touched.password ? {border: '1px solid green', backgroundColor: '#00800030'} :
						{border: '1px solid gray'}
					}
					/>
					</>
				}

				{
					fields.name && 
					<>
					<div className='d-flex justify-content-between'>
						<label htmlFor="name" className='form-label mt-2'>Name</label>
						{
							errors.name && touched.name ? 
							<p className='form-label mt-2 error'>{errors.name }</p>
							: 
							null
						}
					</div>
					<Field
					id="name"
					name="name"
					placeholder=""
					type="text"
					className='form-control'
					style={
						errors.name && touched.name ? {border: '1px solid crimson', backgroundColor: '#ed143d30'} : 
						!errors.name && touched.name ? {border: '1px solid green', backgroundColor: '#00800030'} :
						{border: '1px solid gray'}
					}
					/>
					</>
				}

				{
					fields.id && 
					<>
					<div className='d-flex justify-content-between'>
						<label htmlFor="id" className='form-label mt-2'>ID</label>
						{
							errors.id && touched.id ? 
							<p className='form-label mt-2 error'>{errors.id }</p>
							: 
							null
						}
					</div>
					<Field
					id="id"
					name="id"
					placeholder=""
					type="number"
					className='form-control'
					style={
						errors.id && touched.id ? {border: '1px solid crimson', backgroundColor: '#ed143d30'} : 
						!errors.id && touched.id ? {border: '1px solid green', backgroundColor: '#00800030'} :
						{border: '1px solid gray'}
					}
					/>
					</>
				}
        <button type="submit" className='btn btn-outline-warning mt-4 w-25 d-flex justify-content-between align-items-center'>
					{
						fields.email ?
						<><span>Continue</span><Ricons.GrFormNext/></>
						:
						<><span>Search</span><Ricons.GrFormSearch/></>
					}
				</button>
    </Form>
    )}
    </Formik>
	)
}

export default Forms