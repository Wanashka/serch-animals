import React, { useContext, useEffect } from 'react';
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { fetchBrands, fetchCategories, fetchDevices, fetchTypes, fetchTyBrands } from "../http/deviceAPI";
import Pages from "../components/Pages";
import CategoryBar from '../components/CategoryBar';

const Shop = observer(() => {
    const { device } = useContext(Context)

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        if(!device.selectedType.id) {
            fetchBrands().then(data => null)
        } else {
            fetchTyBrands(device.selectedType.id).then(data => device.setBrands(data))
        }
           }, [device.selectedType])

    useEffect(() => {
        fetchCategories().then(data => device.setCategories(data))

        fetchDevices(null, null, null, 1, 5).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    }, [])

    useEffect(() => {
        fetchDevices(device.selectedCategory.id, device.selectedType.id, device.selectedBrand.id, device.page).then(data => {
            console.log(device.selectedBrand.id)
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    }, [ device.selectedCategory, device.selectedType, device.selectedBrand, device.page])

    return (
        <Container>
            <Row className="mt-2">
                <Col md={3}>
                <CategoryBar />
                    <TypeBar />
                </Col>
                <Col md={9}>
                    <BrandBar />
                    <DeviceList />
                    <Pages />
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;
