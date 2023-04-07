import Link from 'next/link';
import { addToHistory } from '@/lib/userData';
import { useRouter } from "next/router";
import { useState } from 'react';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';
import { Container, Nav, Navbar, Form, Button, NavDropdown } from "react-bootstrap";
import { readToken } from '@/lib/authenticate';
import { removeToken } from '@/lib/authenticate';

export default function MainNav() {
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

    const token = readToken();

    async function submitForm(e){
      e.preventDefault();
      setIsExpanded(false);
      if (search != ""){ 
        let url = `/artwork?title=true&q=${e.target[0].value}`;
        router.push(url);
        let queryString = `title=true&q=${e.target[0].value}`;
        setSearchHistory(await addToHistory(queryString));
        setSearch("");
      } 
    }
    function logout(){
      setIsExpanded(false);
      removeToken();
      router.push("/login");
    } 
    return (
      <>
        <Navbar expand="lg" expanded={isExpanded} bg="primary" variant="primary" className="fixed-top">
          <Container>              
              <Navbar.Brand>Lais da Silva Lopes Furtado</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={()=>{setIsExpanded(!isExpanded)}}/>
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">                           
                  <Link href="/" passHref legacyBehavior><Nav.Link active={router.pathname === "/"} onClick={()=> {setIsExpanded(false)}}>Home</Nav.Link></Link>
                  {token && <Link href="/search" passHref legacyBehavior><Nav.Link active={router.pathname === "/search"} onClick={()=> {setIsExpanded(false)}}>Advanced Search</Nav.Link></Link>}             
                </Nav>
                {!token && <Nav>
                  <Link href="/register" passHref legacyBehavior><Nav.Link active={router.pathname === "/register"} onClick={()=> {setIsExpanded(false)}}>Register</Nav.Link></Link>
                  <Link href="/login" passHref legacyBehavior><Nav.Link active={router.pathname === "/login"} onClick={()=> {setIsExpanded(false)}}>Login</Nav.Link></Link>
                  </Nav>}
                {token && <Form className="d-flex" onSubmit={submitForm} >
                    <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    value={search} 
                    onChange={e=>{setSearch(e.target.value)}}               
                    />
                    <Button type="submit" variant="success">Search</Button>
                </Form>}
                {token && <Nav>
                <NavDropdown title={token.userName} id="basic-nav-dropdown">
                  <Link href="/favourites" passHref legacyBehavior><NavDropdown.Item active={router.pathname === "/favourites"} >Favourites</NavDropdown.Item></Link>
                  <Link href="/history" passHref legacyBehavior><NavDropdown.Item active={router.pathname === "/history"}>Search History</NavDropdown.Item></Link>
                  <NavDropdown.Item onClick={()=>logout()}>Logout</NavDropdown.Item>              
                </NavDropdown>
                </Nav>} 
             </Navbar.Collapse>
          </Container>
        </Navbar>
        <br/> 
        <br/>     
      </>
    )
}
  