import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Card, Row} from "react-bootstrap";

const CategoryBar = observer(() => {
    const {device} = useContext(Context)

    return (
        <Row className="d-flex">
            {device.categories.map(category =>
                <Card
                    style={{cursor:'pointer'}}
                    key={category.id}
                    className="p-3" 
                    onClick={() => device.setSelectedCategory(category)}
                    border={category.id === device.selectedCategory.id ? 'dark' : ''}
                >
                    {category.name}
                </Card>
            )}
        </Row>
    );
});

export default CategoryBar;
