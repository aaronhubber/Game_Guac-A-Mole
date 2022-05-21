import React from "react";
import styled from "styled-components";

const MolesBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;
    width: 80%;
`

export const Moles = ({children}) => {
    return (
    <>
    <MolesBox>{children}</MolesBox>
    </>
    )
}