import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from 'react-router-dom';
import styled from 'styled-components';

export const PostBackground = styled.div`
  margin: 30px;
  margin-top: 15px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
`;

export const Post = styled.div`
  width: 260px;
  height: 350px;

  margin: 15px;
  border: 1px solid rgb(0, 0, 0);
  align-items: center;
  flex-direction: column;
  display: flex;
  justify-content: space-between;

  &:hover {
    border: 1px solid rgb(207, 57, 57);
  }
`;

export const PostContents = styled.div`
  width: 100px;
  height: 100px;
  background-color: white;
  margin-bottom: 50px;
  border: 1px solid rgb(0, 0, 0);
`;
export const MainPosts = ({ allPost, postClickNav }) => {
  // 함수, 직종 = 맞는 직종 이미지
  // 게시판아이디 직종 제목
  //   const handelPost = () => {
  //     setNowPost(props.post)
  //   };

  return (
    <>
      <PostBackground>
        {allPost.map((post) => (
          <Post onClick={() => postClickNav(post)}>
            <img
              className="work_img"
              src={`img/img_work/${post.occupation}.jpeg`}
            />
            <PostContents>{post.title}</PostContents>
          </Post>
        ))}

        {/* <img className="work_img" src={`img/${das}`} /> */}
      </PostBackground>
    </>
  );
};
