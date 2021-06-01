import React, { useState } from 'react'
import { ListGroup } from 'react-bootstrap'
import { useContacts } from '../contexts/ContactsProvider';

export default function Profile({username}) {

  return (
    <ListGroup >
        <ListGroup.Item>
          Name: {username}
        </ListGroup.Item>
      <ListGroup.Item>
        Profile Picture:
        </ListGroup.Item>
    </ListGroup>
  )
}
