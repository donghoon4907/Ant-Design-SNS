import styled from "styled-components";
import { Button } from "antd";
import TextareaAutosize from "react-autosize-textarea";

export const CommentSubmit = styled(Button)`
  position: absolute;
  top: 0;
  right: 0;
  width: 15%;
  border-radius: 0;
`;

export const CommentContainer = styled.div`
  margin-top: 20px;
`;

export const CommentTextArea = styled(TextareaAutosize)`
  float: left;
  width: 85%;
  font-size: 18px;
  border: 1px solid lightgray;
  height: 30px;
`;

export const PostTitle = styled.div`
  & > div:nth-child(1) {
    float: left;
  }
  & > div:nth-child(2) {
    float: right;
  }
`;
