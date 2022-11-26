/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { styled } from "../stiches";
import { IoMdCopy } from "react-icons/io";
import { Checkbox } from "./Checkbox";
import { IPasswordOptions } from "../types/passwordGenerator";
import { InputRange } from "./InputRange";

const PasswordContainer = styled("div", {
  height: "60px",
  backgroundColor: "$grey-1",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "1rem",
  boxSizing: "border-box",
});

const Password = styled("div", {
  userSelect: "none",
  fontSize: "4vw",
  "@media(min-width: 500px)": {
    fontSize: "1.25rem",
  },
});

const CopyButton = styled("button", {
  fontSize: "1.25rem",
  background: "transparent",
  border: "none",
  margin: 0,
  padding: 0,
  transition: "all .1s ease",
  cursor: "pointer",
  "&:active": {
    transform: "scale(1.2)",
  },
});

const CopySvg = styled(IoMdCopy, {
  fontSize: "2rem",
  color: "$green-1",
  "&:hover": {
    color: "$green-2",
  },
});

const Form = styled("form", {
  background: "$grey-1",
  marginTop: "1rem",
  padding: "1.5rem 1rem",
  minHeight: "320px",
});

const GenerateButton = styled("button", {
  cursor: "pointer",
  width: "100%",
  textAlign: "center",
  border: "none",
  color: "$dark-1",
  fontSize: "1.25rem",
  padding: "1rem 0",
  fontWeight: "bold",
  marginTop: "2rem",
  userSelect: "none",
  backgroundColor: "$green-1",
  transition: "all .2s ease",
  "&:hover": {
    backgroundColor: "$green-2",
  },
  "&:active": {
    opacity: "0.5",
  },
});

const CharLabel = styled("label", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  userSelect: "none",
  "& > span": {
    color: "$green-1",
    fontSize: "1.5rem",
  },
});

const generateValue = (options: IPasswordOptions) => {
  const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerChars = "abcdefghijklmnopqrstuvwxyz";
  const symbols = "!#¤%&?@£$*^";
  let value = "";

  while (value.length < 1) {
    const x = Math.floor(Math.random() * 4);

    if (options.uppercase && x === 0) {
      value += upperChars.charAt(Math.floor(Math.random() * upperChars.length));
    } else if (options.lowercase && x === 1) {
      value += lowerChars.charAt(Math.floor(Math.random() * lowerChars.length));
    } else if (options.symbols && x === 2) {
      value += symbols.charAt(Math.floor(Math.random() * symbols.length));
    } else if (options.numbers && x === 3) {
      value += Math.floor(Math.random() * 10).toString();
    }
  }

  return value;
};

interface PasswordGeneratorProps {
  children?: React.ReactNode;
}

export const PasswordGenerator: React.FC<PasswordGeneratorProps> = () => {
  const [password, setPassword] = useState<string>();
  const [options, setOptions] = useState<IPasswordOptions>({
    charLength: 16,
    lowercase: true,
    uppercase: true,
    numbers: true,
    symbols: true,
  });

  const generatePassword = () => {
    let newPassword = "";

    for (let i = 0; i < options.charLength; i++) {
      newPassword += generateValue(options);
    }

    setPassword(newPassword);
  };

  useEffect(() => {
    generatePassword();
  }, []);

  return (
    <>
      <PasswordContainer>
        <Password>{password}</Password>
        <CopyButton
          aria-label="Copy password"
          onClick={() => {
            if (password) {
              window.navigator.clipboard.writeText(password);
            }
          }}
        >
          <CopySvg viewBox="0 0 312 512" />
        </CopyButton>
      </PasswordContainer>

      <Form
        onSubmit={(e) => {
          e.preventDefault();
          generatePassword();
        }}
      >
        <CharLabel htmlFor="charRange">
          Character Length<span>{options.charLength}</span>
        </CharLabel>
        <InputRange
          id="charRange"
          onChange={(e) => setOptions({ ...options, charLength: +e.currentTarget.value })}
          value={options.charLength}
          min={6}
          max={32}
        />
        <Checkbox
          checked={options.uppercase}
          required={!options.lowercase && !options.numbers && !options.symbols}
          label="Include Uppercase Letters"
          onClick={() => setOptions({ ...options, uppercase: !options.uppercase })}
        />
        <Checkbox
          checked={options.lowercase}
          required={!options.uppercase && !options.numbers && !options.symbols}
          label="Include Lowercase Letters"
          onClick={() => setOptions({ ...options, lowercase: !options.lowercase })}
        />
        <Checkbox
          checked={options.numbers}
          required={!options.uppercase && !options.lowercase && !options.symbols}
          label="Include Numbers"
          onClick={() => setOptions({ ...options, numbers: !options.numbers })}
        />
        <Checkbox
          checked={options.symbols}
          required={!options.uppercase && !options.lowercase && !options.numbers}
          label="Include Symbols"
          onClick={() => setOptions({ ...options, symbols: !options.symbols })}
        />
        <GenerateButton>Generate</GenerateButton>
      </Form>
    </>
  );
};
