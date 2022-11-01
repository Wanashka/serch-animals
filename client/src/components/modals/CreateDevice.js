import React, { useContext, useEffect, useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Dropdown, Form, Row, Col } from "react-bootstrap";
import { Context } from "../../index";
import { createDevice, fetchCategories, fetchBrands, fetchDevices, fetchTyBrands, fetchTypes } from "../../http/deviceAPI";
import { observer } from "mobx-react-lite";
import { Map, Placemark, SearchControl, GeolocationControl, YMaps } from 'react-yandex-maps';

const CreateDevice = observer(({ show, onHide }) => {
    const { device } = useContext(Context)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [file, setFile] = useState(null)
    const [phone, setPhone] = useState('')
    const [coords, setCoords] = useState([])

    const mapData = {
        center: [47.2313, 39.7233],
        zoom: 9,
        controls: [],
    };

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        if (!device.selectedType.id) {
            fetchBrands().then(data => device.setBrands(data))
        } else {
            fetchTyBrands(device.selectedType.id).then(data => device.setBrands(data))
        }
        fetchCategories().then(data => device.setCategories(data))
    }, [device.selectedType])

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const addDevice = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('description', description)
        formData.append('phone', phone)
        formData.append('img', file)
        formData.append('coords', JSON.stringify(coords))
        console.log(coords)
        formData.append('categoryId', device.selectedCategory.id)
        formData.append('breedId', device.selectedBrand.id)
        formData.append('typeId', device.selectedType.id)
        createDevice(formData).then(() => alert("Объявление успешно создано!"))
    }

    const onMapClick = (event) => {
        setCoords(() => event.get("coords"))
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавьте животное
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>

                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{device.selectedCategory.name || "Выберите действие"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.categories.map(category =>
                                <Dropdown.Item
                                    onClick={() => {
                                        device.setSelectedCategory(category)
                                    }}
                                    key={category.id}
                                >
                                    {category.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{device.selectedType.name || "Кого ищите?"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.types.map(type =>
                                <Dropdown.Item
                                    onClick={() => device.setSelectedType(type)}
                                    key={type.id}
                                >
                                    {type.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{device.selectedBrand.name || "Выберите породу"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.brands.map(brand =>
                                <Dropdown.Item
                                    onClick={() => device.setSelectedBrand(brand)}
                                    key={brand.id}
                                >
                                    {brand.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>

                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="mt-3"
                        placeholder="Название поста"
                    />
                    <Form.Control
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        className="mt-3"
                        placeholder="Описание поста"
                    />
                    <Form.Control
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        className="mt-3"
                        placeholder="Номер телефона для связи"
                    />
                    <Form.Control
                        className="mt-3"
                        type="file"
                        onChange={selectFile}
                    />
                    <hr />
                </Form>
            </Modal.Body>
            <YMaps query={{ apikey: "4cd3b4cc-d1a9-4215-8436-4f66d882f859" }}>
                <Map
                    defaultState={mapData}
                    onClick={onMapClick}
                    width={"auto"}
                    height={"30vmax"}
                >
                    <SearchControl options={{ float: 'left' }} />
                    <Placemark
                        key={coords.join(",")}
                        geometry={coords}
                    />
                </Map>
                </YMaps>
                <Modal.Footer>
                    <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                    <Button variant="outline-success" onClick={addDevice}>Добавить</Button>
                </Modal.Footer>
        </Modal>
    );
});

export default CreateDevice;
