import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@heroui/react";

export default function navbar() {
    return (
            <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">OV-App</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button as={Link} color="primary" href="/create" variant="flat">
            Login
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
    )
}
