import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Container } from "reactstrap";
import "./css/contact.css";

const Contact = ({ contacts, changeChat }) => {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    const checkUser = async () => {
      const storedUser = localStorage.getItem("chat-app-user");
      if (storedUser) {
        const DATA = JSON.parse(storedUser);
        setCurrentUserImage(DATA.avatarImage);
        setCurrentUserName(DATA.username);
      } else {
        console.error("No user found in localStorage");
      }
    };

    checkUser();
  }, []);

  const changeCurrentContact = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserName && (
        <Container className="parent">
          <div className="brand">
            <h1>Snappy</h1>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  onClick={() => {
                    changeCurrentContact(index, contact);
                  }}
                >
                  <div className="avatars">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt="avatar"
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatars">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
                className="hello"
              />
            </div>
            <div className="username">
              <h3>{currentUserName}</h3>
            </div>
          </div>
        </Container>
      )}
    </>
  );
};

export default Contact;
