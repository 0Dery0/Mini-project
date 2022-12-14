import React from 'react'
import Card from 'react-bootstrap/Card';
import { Spinner } from 'react-bootstrap';
import { gql, useSubscription } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {IoIosPerson} from 'react-icons/io'


const SubsProfileAdmin = gql`
subscription MySubscription {
  miniproject_user(where: {id: {_eq: 1}}) {
    asal
    id
    nama
    umur
    role
  }
}
`

const AdminMiniProfileContainer = () => {
    const {data, loading} = useSubscription(SubsProfileAdmin);
    const email = useSelector((state) => state.user.adminEmail)
    const navigate = useNavigate();
    const handleLogOut = () => {
        navigate('/')
    }
  return (
    <div className='d-flex justify-content-center font-merri'>
                    {
                      loading
                      ?
                      <Spinner animation="border" variant='primary'/>
                      :
                      data?.miniproject_user.map((user) =>(
                        <Card border="light" style={{ width: '14rem' }}>
                          <Card.Header>{user.role}</Card.Header>
                          <Card.Body>
                            <Card.Title><IoIosPerson/>{user.nama}</Card.Title>
                              <span>Umur : {user.umur}</span><br/>
                              <span>Email : {email}</span><br/>
                              <span>Asal : {user.asal}</span><br/>
                              <button onClick={handleLogOut} className="btn text-small btn-primary mt-3">
                                Log Out!
                              </button>
                          </Card.Body>
                        </Card>
                      ))
                    }
                    </div>
  )
}

export default AdminMiniProfileContainer