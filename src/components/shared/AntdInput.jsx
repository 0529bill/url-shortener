import ErrorText from "@/components/shared/ErrorText";
import { Input } from "antd";
import styled from "styled-components";
const StyledInput = styled(Input)``;

const InputWrapper = styled.div`
  margin: 15px 0;
`;

/**
 *
 * @param {*} isError [status, errorMessage]
 * @returns
 *
 */

function AntdInput({ text, isError, ...props }) {
  return (
    <InputWrapper>
      {text && text()}
      <StyledInput status={isError?.length && isError[0]} {...props} />
      <ErrorText>{isError?.length && isError[1]}</ErrorText>
    </InputWrapper>
  );
}

export default AntdInput;
