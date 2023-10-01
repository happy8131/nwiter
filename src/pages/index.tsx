import PostTweetForm from "../components/postTweetForm";
import styled from "styled-components";
import { auth } from "../../firebase";
import Layout from "../components/layout";
import TimeLine from "../components/timeline";

const Wrapper = styled.div`
  display: grid;
  gap: 50px;
  overflow-x: scroll;
  grid-template-rows: 1fr 5fr;
`;

export default function Home() {
  return (
    <Layout>
      <Wrapper>
        <PostTweetForm />
        <TimeLine />
      </Wrapper>
    </Layout>
  );
}
