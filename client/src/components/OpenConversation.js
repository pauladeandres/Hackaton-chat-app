import React, { useState, useCallback } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { useConversations } from "../contexts/ConversationsProvider";
import useLocalStorage from '../hooks/useLocalStorage';
import Image from './Image'

export default function OpenConversation() {
  const [id, setId] = useLocalStorage('id')
  const [text, setText] = useState("");
  const [file, setFile] = useState();

  const setRef = useCallback((node) => {
    if (node) {
      node.scrollIntoView({ smooth: true });
    }
  }, []);
  const { sendMessage, selectedConversation } = useConversations();

  function handleSubmit(e) {
    e.preventDefault();

    if(file) {
      const messageObject = {
        id: id,
        type: "file",
        body: file,
        mimeType: file.type,
        fileName: file.name
      }
      sendMessage(
        selectedConversation.recipients.map((r) => r.id),
        messageObject,
        console.log(messageObject)
      );
      setText("");
    } else {
      sendMessage(
        selectedConversation.recipients.map((r) => r.id),
        text
      );
      setText("");
    }
  }

  function selectFile(e) {
    setText(e.target.files[0].name)
    setFile(e.target.files[0])
  }

  const hiddenFileInput = React.useRef(null)

  const handleClick = event => {
    hiddenFileInput.current.click();
  };

  return (
    <div className="mw-50">
      <div className="d-flex flex-column flex-grow-1 h-75 mt-5 mr-5">
        <div className="flex-grow-1 overflow-auto h-75  align-middle ">
          <div className="d-flex flex-column align-items-start justify-content-end px-3">
            {selectedConversation.messages.map((message, index) => {
              console.log(message)
              const lastMessage = selectedConversation.messages.length - 1 === index;
              if(message.text.type === "file") {
                const blob = new Blob([ message.text.body ], { type: message.text.type })
                return (
                  <div
                    ref={lastMessage ? setRef : null}
                    key={index}
                    className={`my-1 d-flex flex-column ${message.fromMe
                      ? "align-self-end align-items-end"
                      : "align-items-start"
                      }`}
                  >
                    <div
                      className={`rounded px-2 py-1 ${message.fromMe ? "bg-primary text-white" : "border"
                        }`}
                    >
                      <Image fileName={message.text.fileName} blob={blob}/>
                    </div>
                    <div
                      className={`text-muted small ${message.fromMe ? "text-right" : ""
                        }`}
                    >
                      {message.fromMe ? "You" : message.senderName}
                    </div>
                  </div>
                )
              } else {
              
              return (
                <div
                  ref={lastMessage ? setRef : null}
                  key={index}
                  className={`my-1 d-flex flex-column ${message.fromMe
                    ? "align-self-end align-items-end"
                    : "align-items-start"
                    }`}
                >
                  <div
                    className={`rounded px-2 py-1 ${message.fromMe ? "bg-primary text-white" : "border"
                      }`}
                  >
                    {message.text}
                  </div>
                  <div
                    className={`text-muted small ${message.fromMe ? "text-right" : ""
                      }`}
                  >
                    {message.fromMe ? "You" : message.senderName}
                  </div>
                </div>
              );
              }
            })}
          </div>
        </div>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="m-2">
            <InputGroup>
              <Form.Control
                as="textarea"
                required
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSubmit(e)}
                style={{ height: "75px", resize: "none" }}
              />
              <Button onClick={handleClick}>
                Image
      </Button>
              <input
                type="file"
                ref={hiddenFileInput}
                onChange={selectFile}
                style={{ display: 'none' }}
              />
            <InputGroup.Append>
                <Button type="submit">Send</Button>
              </InputGroup.Append>
            </InputGroup>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}
  
