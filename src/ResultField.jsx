import React, { useState, useRef, useCallback } from 'react';
import Styled from 'styled-components';
import 'semantic-ui-css/semantic.min.css';
import { Form } from 'semantic-ui-react';

const ResultField = ({data}) => {
  const numberFormat = useCallback((value) => {
    return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ","); 
  }, []);

  return (
    <Fieldset>
      <Form>
        <H3>{data.no}차<MemberCount>인원 : {data.memberCount}명</MemberCount></H3>
        <TotalPay><b>총 금액</b> : {numberFormat(data.totalPay)}원</TotalPay>
        <Description><h5>설명</h5>{data.description}</Description>
        <h5 style={{marginBottom: '6px'}}>이름</h5>
        <MemberList>
          {data.memberList.map(member => <MemberLi key={member}>{member}</MemberLi>)}
        </MemberList>
        <b style={resultStyle}>1인당 금액 : {numberFormat(data.resultPay)}원</b>
      </Form>
    </Fieldset>
  )
}

export default ResultField;

const Fieldset = Styled.fieldset`
  padding: 10px 10px 14px;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  border-radius: 4px;
  box-shadow: 0px 2px 3px #00000020;
`;
const H3 = Styled.h3`
  position: relative;
  height: 38px;
  line-height: 38px;
`;
const MemberCount = Styled.span`
  position: absolute;
  top: 0;
  right: 0;
  font-size: 14px;
  line-height: 18px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
`;
const TotalPay = Styled.p`
  font-size: 16px;
`;
const Description = Styled.div`
  margin-bottom: 10px;
  & > h5 {
    margin-bottom: 6px;
  }
`;
const MemberList = Styled.ul`
  padding-bottom: 16px;
  border-bottom: 1px solid #aaa;
  margin-bottom: 16px;
`;
const resultStyle = {
  fontSize: '16px'
}
const MemberLi = Styled.li`
  list-style-type: disc;
  list-style-position: inside;
  padding: 2px 0;
`;