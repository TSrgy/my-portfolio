import { Card, Elevation } from "@blueprintjs/core";
import { Col, Container, Row } from "react-grid-system";

import { Currency } from "@store/currencySlice";
import React from "react";
import { RootState } from "@store";
import { useSelector } from "react-redux";

export const CurrencyList: React.FC = () => {
    const currencies = useSelector((state: RootState) => state.currencies.currencies);

    const renderCurrencyItem = (currency: Currency) => {
        return (
            <Card interactive={true} elevation={Elevation.TWO}>
                <h5>{currency.name}</h5>
            </Card>
        );
    };

    return (
        <Container>
            <Row>
                {currencies.ids
                    .map((id) => currencies.entities[id])
                    .map((currency) => {
                        if (currency) {
                            return (
                                <Col sm={6} key={currency.id}>
                                    {" "}
                                    {renderCurrencyItem(currency)}
                                </Col>
                            );
                        } else {
                            return <></>;
                        }
                    })}
            </Row>
        </Container>
    );
};
