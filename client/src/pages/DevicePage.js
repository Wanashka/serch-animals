import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { useParams } from 'react-router-dom'
import { fetchOneDevice, fetchComments } from "../http/deviceAPI";
import CreateComment from "../components/modals/CreateComment";
import { Map, Placemark, SearchControl, GeolocationControl, YMaps } from 'react-yandex-maps';

const DevicePage = () => {
    const [commentVisible, setCommentVisible] = useState(false)

    const [device, setDevice] = useState({})
    const [comment, setComment] = useState([])
    const { id } = useParams()
    useEffect(() => {
        setDevice({ coords: [] })
        const fetchData = async () => {
            const [device, comments] = await Promise.all([fetchOneDevice(id), fetchComments(id)])
            setDevice(device)
            setComment(comments)
            console.log(device)
        }

        fetchData()
    }, [])

    return (
        <Container className="mt-3">
            <Row>
                <Col md={4}>
                    {device.img ? <Image width={300} height={300} src={process.env.REACT_APP_API_URL + device.img} /> : <></>}
                </Col>
                <Col md={4}>
                    <Row className="d-flex flex-column align-items-center">
                        <h2>{device.name}</h2>

                    </Row>
                </Col>
                <Col md={4}>

                </Col>
            </Row>
            <Row className="d-flex flex-column m-3">
                <h1>Описание</h1>

                <h3>{device.description || "Отсутствует"}</h3>
                <h3>{device.type}</h3>

                <h2>Телефон</h2>
                <h3>{device.phone}</h3>
            </Row>
            <Row>
                <h3>Комментарии</h3>
                {comment.map(c => <div>
                    <br />
                    <h4>{c.avtor}</h4>
                    <h5>{c.info}</h5>
                    <br />
                </div>)}
                <Button
                    variant={"outline-dark"}
                    className="mt-4 p-2"
                    onClick={() => setCommentVisible(true)}
                >
                    Написать комментарий
                </Button>
                <CreateComment setDeviceCommentState={setComment} show={commentVisible} onHide={() => setCommentVisible(false)} />
            </Row>
            <Row>
                <h3 text-align={"center"}>Произошло это в районе точки на карте</h3>
                <YMaps query={{ apikey: "4cd3b4cc-d1a9-4215-8436-4f66d882f859" }}>
                <Map defaultState={{ center: device.coords, zoom: 9 }}
                    width={"100vmax"}
                    height={"30vmax"}>
                    <SearchControl options={{ float: 'right' }} />
                    <Placemark
                        key={device.coords}
                        geometry={device.coords}
                    />
                </Map>
                </YMaps>
            </Row>
        </Container >
    );
};

export default DevicePage;
