import { Container } from "@mui/material"
import React from "react"
import Header from "./Header"
import { Outlet } from "react-router-dom"

const Layout: React.FC = () => (
  <>
    <Container maxWidth="lg">
      <Outlet/>
    </Container>
  </>
)

export default Layout