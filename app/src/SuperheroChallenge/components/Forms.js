import { logginAction, getHeroAction } from '../services/formActions'
import { connect } from 'react-redux'
import { Formik, Field, Form } from 'formik';
import * as Yup from "yup";
import * as Ricons from 'react-icons/io5'

import '../styles/forms.scss'


const Validations = (type) => {
	return type === 'login' ?
		Yup.object().shape({
			email: Yup.string()
				.email('This is not an email')
				.required('Required')
				.matches('challenge@alkemy.org', 'Not that one'),
			password: Yup.string()
				.min(2, 'Too Short!')
				.max(10, 'Too Long!')
				.required('Required')
				.matches('react', 'Neither this one'),
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

const Forms = ({isFetching, findedHeroes, logginAction, getHeroAction, ...fields}) => {
	const {type, email, password, id, name} = fields

	const handleSubmit = (values) => {
		if(type === 'login'){
			return logginAction(values.email, values.password)
		}
		if(type === 'search'){
			return getHeroAction(values.name, values.id, false)
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
    <Form className='form' autoComplete='off'>

				{
					email && 
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
					className='form-control text-light p-3'
					style={
						errors.email && touched.email ? {border: '1px solid crimson', backgroundColor: '#ed143d30'} : 
						!errors.email && touched.email ? {border: '1px solid green', backgroundColor: '#00800030'} :
						{border: '1px solid gray'}
					}
					/>
					</>
				}

				{
					password && 
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
					className='form-control text-light p-3'
					style={
						errors.password && touched.password ? {border: '1px solid crimson', backgroundColor: '#ed143d30'} : 
						!errors.password && touched.password ? {border: '1px solid green', backgroundColor: '#00800030'} :
						{border: '1px solid gray'}
					}
					/>
					</>
				}

				{
					name && 
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
					className='form-control text-light p-3'
					style={
						errors.name && touched.name ? {border: '1px solid crimson', backgroundColor: '#ed143d30'} : 
						!errors.name && touched.name ? {border: '1px solid green', backgroundColor: '#00800030'} :
						{border: '1px solid gray'}
					}
					/>
					</>
				}

				{
					id && 
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
					className='form-control text-light p-3'
					style={
						errors.id && touched.id ? {border: '1px solid crimson', backgroundColor: '#ed143d30'} : 
						!errors.id && touched.id ? {border: '1px solid green', backgroundColor: '#00800030'} :
						{border: '1px solid gray'}
					}
					/>
					</>
				}
        <button type="submit" className='btn btn-outline-warning mt-5 p-3 w-100 d-flex justify-content-between align-items-center' disabled={isFetching ? true : false}>
					{
						(isFetching && 'Loading')||<span>{fields.email ? 'Continue' : 'Search'}</span>
					}
					{
						(isFetching && <div className="spinner-grow text-warning" role="status" style={{width: "3rem", height: "3rem"}}></div>)||(fields.email ? <Ricons.IoArrowForward size={20}/> : <Ricons.IoSearch size={20}/>)
					}
				</button>
    </Form>
    )}
    </Formik>
	)
}

const mapStateToProps = (state) => {
	const {isFetching, findedHeroes} = state.heroReducer
	return {
			isFetching,
			findedHeroes
	}
}

export default connect(mapStateToProps, {logginAction, getHeroAction})(Forms)