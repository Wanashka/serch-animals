import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Card, Row } from "react-bootstrap";

const BrandBar = observer(() => {
    const { device } = useContext(Context)
    return (
        <Row className="d-flex">
            {device.brands.map(brand =>
                <Card
                    style={{ cursor: 'pointer' }}

                    className="w-25 p-3"
                    onClick={() => device.setSelectedBrand(brand)}
                    key={brand.id}
                    border={brand.id === device.selectedBrand.id ? 'red' : 'light'}
                >
                    {brand.name}
                </Card>
            )}
        </Row>
    );
});

export default BrandBar;
