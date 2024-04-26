
import { useState } from "react"
import {Row, Col } from "react-bootstrap";
import Dropzone from 'react-dropzone'

import CardOne from "../../assets/cardOne.png"
import {useDropzone} from 'react-dropzone'
import { useCallback } from "react";
import Table from 'react-bootstrap/Table';
import { TableLoading } from 'react-bootstrap-table-loading';
import Gemini from  "../../assets/gemini.png";

import styles from './styles.module.scss'

import { ProcessDataAPI } from "../../constants"

export default function SecondScreen(props) {

    const [currentFileId, setCurrentFileId] = useState(1)

    const [loading, setLoading] = useState(false)
    const onDrop = useCallback(async acceptedFiles => {
        const formData = new FormData();
        const currentFile = acceptedFiles[acceptedFiles.length - 1]
        formData.append('file', currentFile);

        try {
            setLoading(true)
            const response = await fetch(ProcessDataAPI, {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            setLoading(false)
            props.onFileListChange({
                id: currentFileId,
                fileName: currentFile.name,
                format: currentFile.type,
                uploadStatus: "Uploaded",
                dataStatus: "Processed",
            })
            const materialList = data.materials.map((material) => ({ ...material, accepted: true}))
            props.onMaterialListChange([...materialList])
            setCurrentFileId(currentFileId => currentFileId + 1)
            console.log('Upload successful:', data);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
      }, [])

      const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})


    return (
        <>
            <h1 className={"text-start"}>My Emission Activities</h1>

            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#">Data Inputs</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Upload your file</li>
                </ol>
            </nav>
            <div className={styles.upperPart}>
                <div {...getRootProps()} className={styles.dragDropArea}>
                    <input {...getInputProps()}/>
                    <div className={styles.dragDropInner}>
                        <img src={CardOne} className={styles.imgCard}/>
                        {isDragActive ? (
                            <p className={styles.dragDropLabel}>
                                Drop here! <br />
                            </p>
                        ) :
                        (
                            <>
                        <p className={styles.dragDropLabel}>
                            Drag-and-drop <br />
                            any file here! <br />
                            <span style={{fontSize: '20px', marginBottom: "32px"}}>OR</span>
                        </p>
                        <button type="button" class="btn btn-secondary btn-lg">Select a file</button>
                        </>)}
                    </div>
                </div>
            </div>
            <div>
                <Table striped bordered>
                <thead>
                    <tr>
                    <th>S/N</th>
                    <th>File name</th>
                    <th>Format</th>
                    <th>Upload Status</th>
                    <th>Data Interpretation Status</th>
                    </tr>
                </thead>
                { props.fileList.map((fileObject, idx) => (
                    <tbody>
                    <tr>
                    <td>{idx + 1}</td>
                    <td>{fileObject.fileName}</td>
                    <td>{fileObject.fileName.split(".")[1]}</td>
                    <td>{fileObject.uploadStatus}</td>
                    <td>{fileObject.dataStatus}</td>
                    </tr>
                </tbody>
                ))}
                { loading ? (<TableLoading
                    columns={5}
                    lines={3}
                />) : false}
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