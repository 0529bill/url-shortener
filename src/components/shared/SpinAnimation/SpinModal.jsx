import styled, { css } from 'styled-components';

import SpinIcon from './SpinIcon';

const SpinContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1000000;

  ${({ isLoading }) =>
    isLoading &&
    css`
      pointer-events: none;
    `}
`;
const SpinIconWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1000;
`;

const Mask = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: #fff;
  opacity: 0.8;
`;

function SpinModal({ isLoading, children }) {
  return (
    <SpinContainer isLoading={isLoading}>
      {isLoading && (
        <>
          <Mask />
          <SpinIconWrapper>
            <SpinIcon isSpinning={true} />
          </SpinIconWrapper>
        </>
      )}
      {children}
    </SpinContainer>
  );
}

export default SpinModal;
