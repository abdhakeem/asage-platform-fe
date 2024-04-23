import React from 'react'
import {Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import Sidebar from '../../components/sidebar'

export default function InputScreen(props) {
    return (
        <>
             <Container fluid>
                <Row>
                    <Col xs={3} id="sidebar-wrapper">      
                      <Sidebar />
                    </Col>
                    <Col xs={9} id="page-content-wrapper">
                        this is a test
                    </Col> 
                </Row>

            </Container>
        </>
    )
}