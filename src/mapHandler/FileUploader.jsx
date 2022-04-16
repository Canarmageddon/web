import { Form, } from "react-bootstrap/";

export default function FileUploader({ setLstFile }) {
    const handleUpload = (e) => {
        let lstFile = []
        for (let i = 0; i < e.target.files.length; i++) {
            lstFile.push(e.target.files[i])
        }
        console.log(lstFile)
        setLstFile(lstFile);
    }
    return <>
        <Form.Group controlId="formFileMultiple" className="mb-3">
            <Form.Label>Ajoutez des fichiers</Form.Label>
            <Form.Control type="file" multiple onChange={(e) => handleUpload(e)} />
        </Form.Group>
    </>
}