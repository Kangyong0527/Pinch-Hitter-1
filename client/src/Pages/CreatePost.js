import React, { useState } from "react";
import { 
  BrowserRouter,
  Routes, 
  Route, 
  Link,
  useNavigate} from "react-router-dom"
  import axios from "axios";
import Header from '../Components/Header';
import { 
  SelectBoxLocation, 
  SelectBoxJob, 
  SelectBoxPay, 
  Calenda,
  WrapperDiv,
  Head,
  Body,
  SectorWrapper,
  TitleDiv,
  TitleInput,
  IndexDiv,
  ContentTextarea,
  CompleteButton,
} from '../Components/CreatePostComponents';

// 이거뭐지 ?
// axios.defaults.withCredentials = true;

let url = "http://localhost:4000/";

export const CreatPost = (props) => {

  const navigate = useNavigate();
  
  const [ inputTitle, setInputTitle ] = useState("");
  const [ selectLocation, setSelectLocation ] = useState("");
  const [ pickerDate, setPickerDate ] = useState("");
  const [ selectJob, setSelectJob ] = useState("");
  const [ selectPay, setSelectPay ] = useState("");
  const [ textareaContent, setTextareaContent ] = useState("");


  // 입력되는 제목, 지역, 날짜, 직종, 급여, 내용
  const handleInputValue = (e) => {
    setInputTitle(e.target.value);
  };

  const handleSelectValue = (e) => {
    if (e.target.name === 'location') {
      setSelectLocation(e.target.value);
    } else if (e.target.name === 'job') {
      setSelectJob(e.target.value);
    } else if (e.target.name === 'pay') {
      setSelectPay(e.target.value);
    }
  };

  const handlePikerValue = (e) => {
    setPickerDate(e.target.value);
  };

  const handleTextareaValue = (e) => {

    setTextareaContent(e.target.value)
  }

  // 작성 완료 버튼
  // 작성한 게시물 정보 -> 서버로
  const postCompleteButton = () => {
    console.log("작성완료 버튼 클릭");
    navigate("/");
  

    // if (inputTitle.length > 0 &&
    //     selectLocation.length > 0 &&
    //     pickerDate.length > 0 &&
    //     selectJob.length > 0 &&
    //     selectPay.length > 0 &&
    //     textareaContent.length > 0
    // ) {
    //     axios({
    //       url: url + "/notice-board",
    //       method: "post",
    //       data: {
    //         user_id: props.userinfo.user_id,
    //         title: inputTitle,
    //         occupation: selectJob,
    //         wage: selectPay,
    //         work_date: pickerDate,
    //         work_place:selectLocation,
    //         content: textareaContent,
    //       },
    //       withCredentials: true,
    //     })
    //       .then(() => {
    //         alert("작성을 완료하셨습니다.")
    //         navigate.push("/")
    //       })
    //       .catch((err) => console.log(err))
    //     } else {
    //         alert("제목과 내용을 모두 입력해주세요.")
    //     }


  }

  return (
    <>
      <Header />
      <WrapperDiv>
        <Body>
          <TitleDiv>게시글 작성</TitleDiv>
          <SectorWrapper>
            <IndexDiv>제목</IndexDiv>
            <TitleInput
              placeholder="간략하게 나타내 주세요!"
              type="text"
              name="title"
              onChange={handleInputValue}
            />
            <IndexDiv>지역</IndexDiv>
            <SelectBoxLocation name="location" onChange={handleSelectValue} />
            <IndexDiv>날짜</IndexDiv>
            <Calenda name="date" onChange={handlePikerValue} />
            <IndexDiv>직종</IndexDiv>
            <SelectBoxJob name="job" onChange={handleSelectValue} />
            <IndexDiv>시급</IndexDiv>

            <SelectBoxPay 
              name="pay"
              onChange={handleSelectValue}
            />
        </SectorWrapper>      
            <IndexDiv>내용</IndexDiv>
            <ContentTextarea 
              placeholder="근무시간 및 주요사항에 대해 설명해 주세요!"
              type="text"
              name="content"
              onChange={handleTextareaValue} 
            />
          <CompleteButton 
            onClick={postCompleteButton}
          >작 성 완 료</CompleteButton>
      </Body> 
    </WrapperDiv>   
    </>
  );
};

export default CreatPost;