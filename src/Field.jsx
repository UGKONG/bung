import React, { useState, useRef } from 'react';
import Styled from 'styled-components';
import 'semantic-ui-css/semantic.min.css';
import { Form } from 'semantic-ui-react';

const Field = ({n}) => {
  const inputRef = useRef(null);
  const [count, setCount] = useState([]);
  const [payResult, setPayResult] = useState(0);

  const peopleCountChange = e => {
    let val = Number(e.target.value);
    let arr = [];
    for (let i = 0; i < val; i++) {
      arr.push(i + 1);
    }
    setCount(arr);
    let totalPay = String(inputRef.current.value).replaceAll(',', '');
    setPayResult(String(Math.ceil(totalPay / val)).replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  }

  const payChange = e => {
    let value = e.target.value.replaceAll(',', '');
    e.target.value = String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    if (count < 2) {
      setPayResult(String(Math.ceil(value)).replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    } else {
      setPayResult(String(Math.ceil(value / count.length)).replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    }
  }

  return (
    <Fieldset className="field">
      <Form>
        <H3>
          {n}차
          <CountInput className='memberCount' data-count={count.length} onChange={peopleCountChange}>
            <option value="0">인원선택</option>
            <option value="2">2명</option>
            <option value="3">3명</option>
            <option value="4">4명</option>
            <option value="5">5명</option>
            <option value="6">6명</option>
            <option value="7">7명</option>
            <option value="8">8명</option>
            <option value="9">9명</option>
            <option value="10">10명</option>
          </CountInput>
        </H3>
        <input placeholder='총 금액' className='totalPay' style={inputStyle} ref={inputRef} onChange={payChange} />
        <span style={wonStyle}>원</span>
        <input placeholder='설명' className='description' style={descriptionStyle} />
        {
          count.map(data => {
            return (
              <Form.Field key={data}>
                <label>이름</label>
                <input placeholder='Name' className='name' data-count={n + '-' + data} />
              </Form.Field>
            )
          })
        }
        <b style={resultStyle}>
          1인당 금액 : 
          <span className="resultPay" style={{marginLeft: '4px'}}>
            {payResult === 'NaN' ? 0 : payResult}
          </span>
          원
        </b>
      </Form>
    </Fieldset>
  )
}

export default Field;

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
const CountInput = Styled.select`
  position: absolute;
  top: 0;
  right: 0;
  font-size: 13px;
  width: 100px !important;
`;
const inputStyle = {
  marginBottom: '16px',
  width: '200px'
}
const wonStyle = {
  display: 'inline-block', 
  padding: '8px'
}
const descriptionStyle = {
  marginBottom: '16px'
}
const resultStyle = {
  fontSize: '16px'
}