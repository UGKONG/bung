import React, { useRef, useContext, useCallback } from 'react';
import Styled from 'styled-components';
import 'semantic-ui-css/semantic.min.css';
import { Header, Button } from 'semantic-ui-react';
import ResultField from './ResultField';
import { Store } from './App';

const Result = () => {
  const ulEl = useRef(null);
  const store = useContext(Store);
  const resultBackBtnClick = useCallback(() => {
    let fn = store.setResultPagePo;
    fn(100);
  }, [store.setResultPagePo]);

  const calc = useCallback(() => {
    let memberList = [];
    let totalPayList = [];
  
    store.data.forEach(item => {
      item.memberList.forEach(member => memberList.push(member));
    });
    let set = new Set(memberList);
    memberList = [...set];
    memberList.forEach(name => totalPayList.push({name: name, pay: 0}))
  
    store.data.forEach(item => {
      for (let i in memberList) {
        let YN = item.memberList.indexOf(memberList[i]);
        if (YN > -1) {
          let pay = item.resultPay;
          let obj = totalPayList.find(x => x.name === memberList[i]);
          obj.pay += pay;
        }
      }
    });

    if (ulEl.current) {

      ulEl.current.innerHTML = '';
      totalPayList.forEach(data => {
        let li = document.createElement('li');
        li.innerHTML = `
          ${data.name} - 
          <i>${
            String(data.pay).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }</i>원
        `;
        ulEl.current.appendChild(li);
      })
    }
  }, [store.data]);  

  calc();

  const accountCopy = () => {
    navigator.clipboard.writeText('3333027945187');
    alert('복사되었습니다.');
  }

  return (
    <Wrap po={store.resultPagePo}>
        <Header size='large' style={{padding: '10px 0'}}>
          <center>{store.bungDate} 정산 결과</center>
        </Header>
        { store.data.map(data => <ResultField key={data.no} data={data} />) }
        <TotalResult>
          <H3>최종결과</H3>
          <ul ref={ulEl}>

            <li>전상욱 - <i>12,000</i>원</li>
            <li>전상욱 - <i>12,000</i>원</li>
            <li>전상욱 - <i>12,000</i>원</li>
            <li>전상욱 - <i>12,000</i>원</li>
          </ul>
        </TotalResult>
      <Btn>
        <p>
          <input
            id="copyInput"
            style={copyInputStyle}
            defaultValue='3333-02-7945187' 
            readOnly
          />
          카카오뱅크
          <Button 
            style={copyStyle} 
            onClick={accountCopy}
          >복사</Button>
        </p>
        <Button onClick={resultBackBtnClick}>뒤로가기</Button>
      </Btn>
    </Wrap>
  )
}

export default Result;

const Wrap = Styled.section`
  width: 100%;
  height: 100%;
  background: #fff;
  position: fixed;
  top: 0;
  left: ${({po}) => po}%;
  padding: 14px 10px;
  overflow: auto;
  transition: .3s;
`;
const Btn = Styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  margin: 20px 0 10px;
`;
const copyInputStyle = {
  color: '#1e70bf', 
  cursor: 'pointer',
  border: 'none',
  outline: 'none',
  textAlign: 'center',
  width: '122px',
}
const copyStyle = {
  width: '42px',
  padding: '0',
  height: '26px',
  fontSize: '12px',
  marginLeft: '5px'
}
const TotalResult = Styled.section`
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
  font-size: 18px;
  margin-bottom: 10px;

  & + ul > li {
    list-style-type: disc;
    list-style-position: inside;
    padding: 3px 0;
    font-weight: 700;
    letter-spacing: 1px;

    i {
      color: red;
    }
  }
`;