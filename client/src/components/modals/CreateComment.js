import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import {createComment} from "../../http/deviceAPI";
import { useParams } from 'react-router-dom';

const CreateComment = ({show, onHide, setDeviceCommentState}) => {
    const [avtor, setAvtor] = useState('')
    const [info, setInfo] = useState('')
    const { id } = useParams()

    const addComment = () => {
        createComment({ avtor, info, animalId: id }).then(data => {
            setDeviceCommentState(prev => [data, ...prev])
            onHide()
        })
    }
    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                   Напишите комментарий
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <h6>Ваше имя</h6>
                    <Form.Control
                    
                        value={avtor}
                        onChange={e => setAvtor(e.target.value)}
                        className='mb-3'
                    />
                    <h6>Ваш комментарий</h6>
                     <Form.Control
                     className='mt-3 p-5 m form-control'
                        value={info}
                        onChange={e => setInfo(e.target.value)}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addComment}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateComment;
