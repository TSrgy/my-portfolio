import { Button, ControlGroup, FormGroup, InputGroup, MenuItem, NumericInput } from "@blueprintjs/core";
import { Col, Container, Row } from "react-grid-system";
import { Currency, addAsset } from "@store/assetSlice";
import { ItemRenderer, Select } from "@blueprintjs/select";
import React, { useState } from "react";

import { useDispatch } from "react-redux";

const CurrencySelect = Select.ofType<Currency>();

const currencies: Currency[] = [
    {
        name: "USD",
        oneDollarPrice: 1
    },
    {
        name: "EUR",
        oneDollarPrice: 0.88
    },
    {
        name: "RUB",
        oneDollarPrice: 73.66
    }
];

const currencyRenderer: ItemRenderer<Currency> = (asset, { handleClick, modifiers }) => {
    return (
        <MenuItem
            key={asset.name}
            active={modifiers.active}
            disabled={modifiers.disabled}
            label={asset.name}
            onClick={handleClick}
            text={asset.name}
        />
    );
};

export const AssetCreateForm: React.FC = () => {
    const [currency, setCurrency] = useState<Currency>(currencies[0]);
    const [assetName, setAssetName] = useState<string>("");
    const [price, setPrice] = useState<number>();
    const [amount, setAmount] = useState<number>();
    const dispatch = useDispatch();

    const addNewAsset = () => {
        dispatch(
            addAsset({
                name: assetName,
                amount: amount || 0,
                currency: currency,
                price: price || 0,
                id: 12
            })
        );
    };

    return (
        <Container>
            <Row>
                <Col sm={6}>
                    <FormGroup label="Asset name">
                        <InputGroup fill={true} value={assetName} onChange={(e) => setAssetName(e.target.value)} />
                    </FormGroup>
                    <FormGroup label="Current price">
                        <ControlGroup vertical={false}>
                            <CurrencySelect
                                items={currencies}
                                filterable={false}
                                onItemSelect={(c) => setCurrency(c)}
                                itemRenderer={currencyRenderer}
                                noResults={<MenuItem disabled={true} text="No results." />}
                            >
                                <Button text={currency.name} rightIcon="caret-down" />
                            </CurrencySelect>
                            <NumericInput fill={true} value={price} onValueChange={(v) => setPrice(v)} />
                        </ControlGroup>
                    </FormGroup>
                    <FormGroup label="Amount">
                        <NumericInput fill={true} value={amount} onValueChange={(v) => setAmount(v)} />
                    </FormGroup>
                    <Button icon="tick" onClick={() => addNewAsset()}>
                        Save
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};
