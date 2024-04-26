
import { useState } from "react"
import {Row, Col, ToggleButtonGroup } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Gemini from  "../../assets/gemini.png";

import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

import Table from 'react-bootstrap/Table';
import { ProcessDataAPI } from "../../constants"
import styles from './styles.module.scss'


export default function LastScreen(props) {
    return (
        <>
            <h1 className={"text-start"}>My Emission Activities</h1>

            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#">Data Inputs</a></li>
                    <li class="breadcrumb-item"><a href="#">Upload your file (s)</a></li>
                    <li class="breadcrumb-item" aria-current="page">Data Validation</li>
                    <li class="breadcrumb-item active" aria-current="page">All Emission Activities</li>
                </ol>
            </nav>
            <div>
                <Table striped bordered>
                <thead>
                    <tr>
                    <th>S/N</th>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Emission Factor</th>
                    <th>Process</th>
                    <th>Emissions</th>
                    <th>Facility</th>
                    <th>Equipment</th>
                    </tr>
                </thead>
                { props.materialList.filter(material => material.accepted).map((material, material_idx) => (
                    <tbody>
                    <tr>
                        
                        <td>{material_idx}</td>
                        <td>{material.item}</td>
                        <td>{material.quantity}</td>
                        <td>{material.ef}</td>
                        <td>{material.process}</td>
                        <td>{Number(material.emissions).toFixed(2)}</td>
                        <td>{material.facility}</td>
                        <td>{material.equipment}</td>
                    </tr>
                </tbody>
                ))}
                </Table>
            </div>
            <button type="button" class="btn btn-secondary btn-lg" style={{marginBottom: "20px"}} onClick={() => props.onBackChange()}>Back</button>
            <button type="button" class="btn btn-primary btn-lg" style={{marginLeft: "12px", marginBottom: "20px"}} onClick={() => props.onChange()}>Next</button>
        
            <Row className={styles.geminiRow}>
                <span style={{"position": "relative", "top": "4px"
                }}>Powered by</span> <img src={Gemini} className={styles.gemini}/>
            </Row>
        </>
    )
}