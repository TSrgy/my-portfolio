import { Card, Elevation } from "@blueprintjs/core";
import { Col, Container, Row } from "react-grid-system";

import { Asset } from "@store/assetSlice";
import React from "react";
import { RootState } from "@store/index";
import { useSelector } from "react-redux";

export const AssetList: React.FC = () => {
    const assets = useSelector((state: RootState) => state.assets.assets);

    const renderAssetItem = (asset: Asset) => {
        return (
            <Card interactive={true} elevation={Elevation.TWO}>
                <h5>{asset.name}</h5>
                <p>Amount: {asset.amount}</p>
                <p>Currency: {asset.currency.name}</p>
                <p>Price: {asset.price}</p>
            </Card>
        );
    };

    return (
        <Container>
            <Row>
                {assets.ids
                    .map((id) => assets.entities[id])
                    .map((asset) => {
                        if (asset) {
                            return (
                                <Col sm={6} key={asset.id}>
                                    {" "}
                                    {renderAssetItem(asset)}
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
