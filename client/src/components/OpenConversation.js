import React, { useState, useCallback, useRef } from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap'
import { useConversations } from '../contexts/ConversationsProvider';
import useLocalStorage from '../hooks/useLocalStorage';
import Image from './Image'
// import io from "socket.io-client";

export default function OpenConversation() {
  const [id, setId] = useLocalStorage('id')
  const [text, setText] = useState('')
  const[file, setFile] = useState()

  // const socketRef = useRef();

  const setRef = useCallback(node => {
    if (node) {
      node.scrollIntoView({ smooth: true })
    }
  }, [])
  const { sendMessage, selectedConversation } = useConversations()

  function handleSubmit(e) {
    e.preventDefault()

    if(file) {
      const messageObject = {
        id: id,
        type: "file",
        body: file,
        mimeType: file.type,
        fileName: file.name
      }
      sendMessage(
        selectedConversation.recipients.map(r => r.id),
        messageObject
      )
      setText('')
  
    } else {
        const messageObject = {
        id: id,
        type: "text",
        body: text,
      }
      sendMessage(
        selectedConversation.recipients.map(r => r.id),
        messageObject
      )
      setText('')
   
    }
  }

  function selectFile(e) {
    setText(e.target.files[0].name)
    setFile(e.target.files[0])
  }
  
  return (
    <div className="d-flex flex-column flex-grow-1">
      <div className="flex-grow-1 overflow-auto">
        <div className="d-flex flex-column align-items-start justify-content-end px-3">
            {selectedConversation.messages.map((message, index) => {
              const blob = new Blob([message.body], { type: message.type })
              const lastMessage = selectedConversation.messages.length - 1 === index
              if(message.type === "file") {
                return (
                <>
                < div
                ref={lastMessage ? setRef : null}
                key={index}
                className={`my-1 d-flex flex-column ${message.fromMe ? 'align-self-end align-items-end' : 'align-items-start'}`}
                >
                <Image fileName={message.fileName} blob={blob} />
                </div>
                <div
                  className={`rounded px-2 py-1 ${message.fromMe ? 'bg-primary text-white' : 'border'}`}>
                  {message.text}
                </div>
                <div className={`text-muted small ${message.fromMe ? 'text-right' : ''}`}>
                  {message.fromMe ? 'You' : message.senderName}
              </div>
              </>
              )
                } else {
              return (
              <>
              <div
              ref={lastMessage ? setRef : null}
              key={index}
              className={`my-1 d-flex flex-column ${message.fromMe ? 'align-self-end align-items-end' : 'align-items-start'}`}
              >
            {message.body}
            </div>
            <div
                  className={`rounded px-2 py-1 ${message.fromMe ? 'bg-primary text-white' : 'border'}`}>
                  {message.text}
                </div>
                <div className={`text-muted small ${message.fromMe ? 'text-right' : ''}`}>
                  {message.fromMe ? 'You' : message.senderName}
              </div>
              </>
              )
            }})}
                
            
        </div>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="m-2">
          <InputGroup>
            <Form.Control
              as="textarea"
              required
              value={text}
              onChange={e => setText(e.target.value)}
              onKeyPress={e => e.key === "Enter" && handleSubmit(e)}
              style={{ height: '75px', resize: 'none' }}
            />
            <input onChange={selectFile} type="file" />
            <InputGroup.Append>
              <Button type="submit">Send</Button>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
    )
}
