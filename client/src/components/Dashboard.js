import React from 'react'
import Sidebar from './Sidebar';
import OpenConversation from './OpenConversation';
import { useConversations } from '../contexts/ConversationsProvider';

export default function Dashboard({ id, username }) {
  const { selectedConversation } = useConversations()

  return (
    <div className="d-flex" style={{ height: '100vh' }}>
      <Sidebar id={id} username={username}/>
      {selectedConversation && <OpenConversation />}
    </div>
  )
}
