import { Button, Divider, Input, Typography } from 'antd';
import React, { useState } from 'react';

import { QRCodeSVG } from 'qrcode.react';
import { useCustomContext } from '@/contextProvider';

const { Title, Paragraph } = Typography;
const { Search } = Input;

function Shortener() {
  const [searchState, setSearchState] = useState(null);

  const { urlRequestSent, urlRequestData } = useCustomContext();

  const handleSearchChange = (value) => {
    setSearchState(value.target.value);
  };
  const handleEnterPressed = (t) => {
    console.log('t', t);
    console.log('searchState', searchState);
    urlRequestSent(searchState);
  };
  console.log('urlRequestData', urlRequestData);
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
          <Paragraph>{`https://url-shortener-water.herokuapp.com/urlRequest/${urlRequestData}`}</Paragraph>
          <Button
            onClick={() =>
              navigator.clipboard.writeText(
                `https://url-shortener-water.herokuapp.com/urlRequest/${urlRequestData}`
              )
            }
          >
            Copy text
          </Button>
          <div>
            <QRCodeSVG
              value={`https://url-shortener-water.herokuapp.com/urlRequest/${urlRequestData}`}
            />
          </div>
        </>
      )}
    </Typography>
  );
}

export default Shortener;
