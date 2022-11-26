import React from "react";
import { PasswordGenerator } from "./components/PasswordGenerator";
import { styled, globalStyles } from "./stiches";

const Main = styled("main", {
  position: "absolute",
  left: "50%",
  top: "50%",
  maxWidth: "500px",
  width: "100%",
  transform: "translate(-50%, -50%)",
});

const Heading = styled("h1", {
  fontSize: "1.25rem",
  color: "$white-1",
  textAlign: "center",
  marginBottom: "1rem",
});

interface AppProps {
  children?: React.ReactNode;
}

export const App: React.FC<AppProps> = () => {
  globalStyles();

  return (
    <Main>
      <Heading>Password Generator</Heading>
      <PasswordGenerator />
    </Main>
  );
};
