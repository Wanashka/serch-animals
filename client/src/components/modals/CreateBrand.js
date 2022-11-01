import React, {useEffect,useState, useContext} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form, Dropdown} from "react-bootstrap";
import {createBrand, createType,fetchTypes} from "../../http/deviceAPI";
import {Context} from "../../index";
const CreateBrand = ({show, onHide}) => {
    const {device} = useContext(Context)
    const [value, setValue] = useState('')
    const [test, setTest] = useState(0)
    const addBrand = () => {
        createBrand({name: value, typeId: device.selectedType.id}).then(data => {
            setValue('')
            onHide()
        })
    }
    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
    }, [])
    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить породу животного
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{device.selectedType.name || "Кого ищите?"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.types.map(type =>
                                <Dropdown.Item
                                    onClick={() => {
                                        device.setSelectedType(type)
                                        setTest(test + 1)
                                    }}
                                    key={type.id}
                                >
                                    {type.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder={"Введите название породы"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addBrand}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
}
export default CreateBrand;
