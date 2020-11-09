import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';

const Product = ({ product }) => {
  return (
    <Card className='my-2 p-2 rounded text-center'>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div'>
            <strong className='product-name'>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as='div'>{product.description}</Card.Text>

        <Card.Text as='h3'>${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
