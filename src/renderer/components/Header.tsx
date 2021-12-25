import * as React from "react";

import { Button, Navbar } from "@blueprintjs/core";

export const Header: React.FC = () => {
    return (
        <Navbar>
            <Navbar.Group align="left">
                <Navbar.Heading>My portfolio</Navbar.Heading>
                <Navbar.Divider />
                <Button icon="cube-add">Add new asset</Button>
            </Navbar.Group>
        </Navbar>
    );
};
