import React, {useState} from 'react'
import { Form, Button, FormControl } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function SearchBox() {

    const [keyword, setKeyword] = useState('');

    const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();
    if (keyword) {
        navigate(`/?keyword=${keyword}`);
    } else {
        navigate(window.location.pathname);
    }
  }

  return (
    <Form onSubmit={submitHandler} className='d-flex'>
        <FormControl
            className='mr-ms-2 ml-sm-5 search'
            placeholder='Search...'
            type='text'
            name='q'
            onChange={(event) => setKeyword(event.target.value)}
        >
        </FormControl>
        <Button
            className='py-2 px-3'
            type='submit'
            variant='outline-success'
        >
            <i className="fa-solid fa-magnifying-glass"></i>
        </Button>
    </Form>
  )
}

export default SearchBox
