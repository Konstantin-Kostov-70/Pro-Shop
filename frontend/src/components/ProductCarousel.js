import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listTopProductsActions } from '../actions/productActions'

function ProductCarousel() {

  const dispatch = useDispatch();

  const productTopRated = useSelector(state => state.productTopRated);
  const {loading, error, products} = productTopRated

  useEffect(() => {
    dispatch(listTopProductsActions())
  },[dispatch])

  return (
    loading ? <Loader /> 
    : error ? <Message variant='danger'>{error}</Message>
    : (
        <Carousel 
          className='bg-dark'
          pause="hover"
        >
            {products.map(product => (
                <Carousel.Item key={product._id}>
                    <div className='carousel-title-wrapper'>
                      <h3 className='carousel-title'>{product.name}</h3>
                      <h4 className='carousel-price'>${product.price}</h4>
                    </div>
                    <Link to={`/product/${product._id}`}>
                        <Image src={product.image} alt={product.name} fluid/>
                    </Link>
                    <Carousel.Caption className='carousel.caption'>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    )
  )
}

export default ProductCarousel
