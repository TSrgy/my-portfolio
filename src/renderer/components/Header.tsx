import * as React from "react";

import { Button, Navbar } from "@blueprintjs/core";

import { Link } from "react-router-dom";

export const Header: React.FC = () => {
    return (
        <Navbar>
            <Navbar.Group align="left">
                <Link to="/assetList">
                    <Button icon="briefcase">Assets</Button>
                </Link>
                <Link to="/createAsset">
                    <Button icon="cube-add">Add new asset</Button>
                </Link>
            </Navbar.Group>
        </Navbar>
    );
};
