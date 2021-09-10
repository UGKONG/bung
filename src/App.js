import React, { useState, useCallback, useRef } from 'react';
import Styled from 'styled-components';
import 'semantic-ui-css/semantic.min.css';
import { Header, Button } from 'semantic-ui-react';
import Field from './Field';
import Result from './Result';

export const Store = React.createContext();

function App() {
  
  const [data, setData] = useState([]);
  const [resultPagePo, setResultPagePo] = useState(100);
  const bungCountRef = useRef(null);
  const dateRef = useRef(null);
  const [bungDate, setBungDate] = useState('');
  const [count, setCount] = useState([]);

  const bungCountChange = useCallback(e => {
    let val = Number(e.target.value);
    let arr = [];
    for (let i = 0; i < val; i++) {
      arr.push(i + 1);
    }
    setCount(arr);
  }, []);

  const bungDateChange = useCallback(e => {
    let val = e.target.value;
    setBungDate(val);
  }, []);

  const sendResultBtnClick = useCallback(() => {
    let arr = [];
    const memberCountEl = document.querySelectorAll('.memberCount');
    const totalPayEl = document.querySelectorAll('.totalPay');
    const descriptionEl = document.querySelectorAll('.description');
    
    totalPayEl.forEach((data, idx) => {
      let tempObj = {
        no: idx + 1,
        description: descriptionEl[idx].value,
        totalPay: Number(totalPayEl[idx].value.replaceAll(',', '')),
        memberCount: Number(memberCountEl[idx].value),
        memberList: []
      }
      tempObj.resultPay = Math.ceil(tempObj.totalPay / tempObj.memberCount);

      for (let i = 0; i < tempObj.memberCount; i++) {
        let tempEl = document.querySelector('[data-count="' + (idx + 1) + '-' + (i + 1) + '"]');
        tempObj.memberList.push(tempEl.value);
      }
      arr.push(tempObj);
    });
    
    setData(arr);
    setResultPagePo(0);
  }, []);

  return (
    <Store.Provider value={{data, setData, resultPagePo, setResultPagePo, bungDate}}>
      <Main>
        <Header size='large' style={{padding: '10px 0'}}>
          <center>정산 프로그램</center>
        </Header>
        <Option>
          <BungCount ref={bungCountRef} onChange={bungCountChange}>
            <option value="0">차수 선택</option>
            <option value="1">1차</option>
            <option value="2">2차</option>
            <option value="3">3차</option>
            <option value="4">4차</option>
            <option value="5">5차</option>
          </BungCount>
          <DateInput placeholder="날짜 선택" ref={dateRef} onChange={bungDateChange} type="date" />
        </Option>
        {count.map(data => <Field key={data} n={data} />)}
        <Button style={{
          display: (count.length === 0 || bungDate === '') ? 'none' : 'block',
          margin: '20px auto'
        }} onClick={sendResultBtnClick}>정산하기</Button>
        <p style={listNoneStyle} hidden={count.length === 0 ? false : true}>
          차수를 선택해주세요.
        </p>
      </Main>
      <Result />
    </Store.Provider>
  );
}

export default App;

const Main = Styled.main`
  padding: 14px 10px;
`;
const Option = Styled.div`
  padding: 0 0 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > select, & > input {
    width: calc(50% - 5px);
    height: 37px;
    border: 1px solid #ddd;
    border-radius: 3px;
    padding: 0 10px;
    font-size: 13px;
  }
`;
const BungCount = Styled.select``;
const DateInput = Styled.input``;
const listNoneStyle = {
  textAlign: 'center',
  color: '#aaa',
  padding: '10px'
}