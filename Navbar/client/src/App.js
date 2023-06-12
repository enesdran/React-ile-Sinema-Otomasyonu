import React, { useState } from "react";
import "./App.css";

import {
  Navbar,
  Nav,
  Card,
  Container,
  NavDropdown,
  Form,
  Button,
} from "react-bootstrap";
import Axios from "axios";

function App() {
  const [id, setId] = useState("");
  const [türü, settürü] = useState([]);
  const [list, setlist] = useState([]);
  const [prefer, setprefer] = useState([]);

  const submittürü = () => {
    Axios.get("http://localhost:3001/api/t%C3%BCr%C3%BC")
      .then((response) => {
        settürü(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const submitprefer = () => {
    Axios.get("http://localhost:3001/api/prefer")
      .then((response) => {
        setprefer(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const submittara = () => {
    setId("");
    if (id) {
      // id varsa sartlı arama yap
      Axios.get(`http://localhost:3001/api/gelsin?id=${id}`).then(
        (response) => {
          setlist(response.data.result);
        }
      );
    } else {
      // id yoksa tum kayitlari getir
      Axios.get("http://localhost:3001/api/gelsin").then((response) => {
        setlist(response.data.result);
      });
    }
  };
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">Curriculum</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="#" onClick={submittara}>
                Home
              </Nav.Link>
              <NavDropdown
                title="Species"
                id="navbarScrollingDropdown"
                onClick={submittürü}
              >
                {türü.map((val) => {
                  return <div key={val.idspecies}>{val.Türü}</div>;
                })}
              </NavDropdown>

              <NavDropdown
                title="Preferences"
                id="navbarScrollingDropdown"
                onClick={submitprefer}
              >
                
                {prefer.map((val) => {
                  return <div key={val.idprefer}>{val.prefercol}</div>;
                })}
              </NavDropdown>

              <NavDropdown title="Communication" id="navbarScrollingDropdown">
                <Container>
                  <NavDropdown.Item href="#action19">
                    curriculum.pw 5651 sayılı yasanın 5. maddesinde tanımlanan
                    yer sağlayıcı olarak hizmet vermektedir.
                    <br></br>
                    İlgili yasaya göre,web site yönetiminin hukuka aykırı
                    içerikleri kontrol etme yükümlülüğü yoktur.
                    <br></br>
                    Bu sebeple, sitemiz uyar ve kaldır prensibini benimsemiştir.
                  </NavDropdown.Item>
                </Container>
              </NavDropdown>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={id}
                onChange={(e) => setId(e.target.value)} // Değişiklik burada yapılıyor
              />
              <Button
                variant="outline-success"
                className="arama"
                onClick={submittara}
              >
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br></br>

      {list.map((val) => {
  const imageSrc = val.resim ? `data:image/png;base64,${val.resim.toString('base64')}` : '';

  return (
    <Card key={val.idfilm} style={{ width: '18rem' }}>
      <div className="movie__card">
        <Card.Img
          className="movie__image"
          variant="top"
          src={imageSrc}
          alt="Movie Image"
        />
        <div className="movie__overlay">
          <div className="movie__title">{val.İsmi}</div>
          <div className="movie__description">{val.tanıtım}</div>
        </div>
      </div>
    </Card>
  );
})}


    </div>
  );
}

export default App;
