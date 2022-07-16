import { Button, Divider, Input, Typography } from 'antd';
import React, { useState } from 'react';

import { QRCodeSVG } from 'qrcode.react';
import { useCustomContext } from '@/contextProvider';

const { Title, Paragraph } = Typography;
const { Search } = Input;
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
function Shortener() {
  const [searchState, setSearchState] = useState(null);
  console.log('useCustomContext123', useCustomContext);
  const { urlRequestSent, urlRequestData } = useCustomContext();

  const handleSearchChange = (value) => {
    setSearchState(value.target.value);
  };
  const handleEnterPressed = (t) => {
    urlRequestSent(searchState);
  };
  console.log('VITE_BASE_URL', VITE_BASE_URL);
  return (
    <Typography>
      <Title>URL shortener</Title>
      <Paragraph>The search of the best url shortener is over!</Paragraph>
      <Search
        placeholder='input search text'
        enterButton='Search'
        size='large'
        value={searchState}
        onChange={handleSearchChange}
        onSearch={handleEnterPressed}
        loading={false}
      />
      {urlRequestData && (
        <>
          <Paragraph>{`${VITE_BASE_URL}/urlRequest/${urlRequestData}`}</Paragraph>
          <Button
            onClick={() =>
              navigator.clipboard.writeText(
                `${VITE_BASE_URL}/urlRequest/${urlRequestData}`
              )
            }
          >
            Copy text
          </Button>
          <div>
            <QRCodeSVG
              value={`${VITE_BASE_URL}/urlRequest/${urlRequestData}`}
            />
          </div>
        </>
      )}
    </Typography>
  );
}

export default Shortener;
