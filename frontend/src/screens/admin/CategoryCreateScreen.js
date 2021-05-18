import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import FormContainer from '../../components/FormContainer'
import { createCategory } from '../../actions/categoryActions'
import { CATEGORY_UPDATE_RESET } from '../../constants/categoryConstants'

const CategoryEditScreen = ({ match, history }) => {
  const [name, setName] = useState('')

  const dispatch = useDispatch()

  const categoryCreate = useSelector((state) => state.categoryCreate)
  const {
    loading,
    error,
    success,
  } = categoryCreate

  useEffect(() => {
    if (success) {
      dispatch({ type: CATEGORY_UPDATE_RESET })
      history.push('/admin/categorylist')
    }
  }, [dispatch, history, success])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createCategory({
        name,
      }),
    )
  }

  return (
    <Container>
      <Link to='/admin/categorylist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Create Category</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Button type='submit' variant='primary'>
              Create
            </Button>
          </Form>
        )}
      </FormContainer>
    </Container>
  )
}

export default CategoryEditScreen
