import React, { useState } from 'react'
import {Container, Row, Col } from "react-bootstrap";
import Sidebar from '../../components/sidebar'

import FirstScreen from '../FirstScreen';
import SecondScreen from '../SecondScreen';
import ThirdScreen from '../ThirdScreen';
import AfterDataValidation from '../AfterDataValidation';
import LastScreen from '../LastScreen';

export default function InputScreen() {

    /*const mock_material_list = [{
        item: "item", 
        file_source: "fs", 
        scope_category: "scope-category", 
        scope_sub_category: "scope sub category", 
        accepted: true
    },
    {
        item: "item 2", 
        file_source: "fs 2", 
        scope_category: "scope-category", 
        scope_sub_category: "scope sub category", 
        accepted: true
    }]*/

    const mock_material_list = [{
        "item": "Cryolite (Synthetic)",
        "file_source": "GenAI Mock Invoice.pdf",
        "facility": "N/A",
        "origin": "Brazil",
        "destination": "Qatar",
        "quantity": 10000,
        "units": "kg",
        "equipment": "Smelting Furnaces",
        "scope_category": 1,
        "scope_sub_category": "Process emissions",
        "process": "Aluminium Smelting",
        "calc_method": "Hybrid",
        "ef_source": "IPCC",
        "emissions": 0,
        "accepted": true,
    },
    {
        "item": "Carbon Cathodes",
        "file_source": "GenAI Mock Invoice.pdf",
        "facility": "N/A",
        "origin": "Brazil",
        "destination": "Qatar",
        "quantity": 150,
        "units": "pieces",
        "equipment": "Electrolytic Cells",
        "scope_category": 1,
        "scope_sub_category": "Process emissions",
        "process": "Aluminium Smelting",
        "calc_method": "Supplier-specific",
        "ef_source": "GHG PROTOCOL",
        "emissions": 0,
        "accepted": true,
    }]
        
    const [currentPage, setCurrentPage] = useState(0)
    const [fileList, setFileList] = useState([]) 
    const [materialList, setMaterialList] = useState(mock_material_list)

    const moveToNextPage = () => setCurrentPage((page) => page + 1)

    const pages = {
        0: (<FirstScreen onChange={moveToNextPage} />),
        1: (
        <SecondScreen 
        onChange={moveToNextPage} 
        fileList={fileList} 
        onFileListChange={(newFileList) => setFileList(newFileList)}
        materialList={materialList}
        onMaterialListChange={(newMaterialList) => setMaterialList(newMaterialList)}/>),
        2: (
        <ThirdScreen 
        onChange={moveToNextPage} 
        materialList={materialList}
        onMaterialListChange={(newMaterialList) => setMaterialList(newMaterialList)}/>),
        3: (
        <AfterDataValidation 
        onChange={moveToNextPage} 
        materialList={materialList}
        onMaterialListChange={(newMaterialList) => setMaterialList(newMaterialList)}/>),
        4: (
        <LastScreen 
        onChange={moveToNextPage} 
        materialList={materialList}
        onMaterialListChange={(newMaterialList) => setMaterialList(newMaterialList)}/>
        )
    }
    return (
        <>
             <Container fluid>
                <Row>
                    <Col xs={3} id="sidebar-wrapper">      
                      <Sidebar />
                    </Col>
                    <Col xs={9} id="page-content-wrapper">
                        {
                            pages[currentPage]
                        }
                    </Col>
                    </Row>
            </Container>
        </>
    )
}