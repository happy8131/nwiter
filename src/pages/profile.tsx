import { ITweet } from "../components/timeline";
import Tweet from "../components/tweet";
import { updateProfile } from "firebase/auth";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { auth, db, storage } from "../../firebase";
import Layout from "../components/layout";
import { async } from "@firebase/util";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`;
const AvatarUpload = styled.label`
  width: 80px;
  overflow: hidden;
  height: 80px;
  border-radius: 50%;
  background-color: #1d9bf0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    width: 50px;
  }
`;

const AvatarImg = styled.img`
  width: 100%;
`;
const AvatarInput = styled.input`
  display: none;
`;

const EditInput = styled.input`
  padding: 10px 20px;
  border-radius: 50px;
  border: none;
`;

const Name = styled.span`
  font-size: 22px;
  display: flex;
  span {
    margin-left: 5px;
    font-size: 12px;
    text-align: center;
    text-justify: center;
    padding: 5px;

    background-color: skyblue;
    border-radius: 10px;
    cursor: pointer;
  }
`;
const Tweets = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 10px;
`;

export default function Profile() {
  const user = auth.currentUser;
  const [avatar, setAvatar] = useState(user?.photoURL);
  const [tweets, setTweets] = useState<ITweet[]>([]);
  const [nameEdit, setNameEdit] = useState("");
  const [bEdit, setbEdit] = useState(false);

  const onAvatarChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!user) return;
    if (files && files.length === 1) {
      const file = files[0];
      const locationRef = ref(storage, `avatars/${user?.uid}`);
      const result = await uploadBytes(locationRef, file);
      const avatarUrl = await getDownloadURL(result.ref);
      setAvatar(avatarUrl);
      await updateProfile(user, {
        photoURL: avatarUrl,
      });
    }
  };

  const fetchTweets = async () => {
    const tweetQuery = query(
      collection(db, "tweets"),
      where("userId", "==", user?.uid),
      orderBy("created", "desc"),
      limit(25)
    );
    const snapshot = await getDocs(tweetQuery);
    const tweets = snapshot.docs.map((doc) => {
      const { tweet, created, userId, username, photo } = doc.data();
      return {
        tweet,
        created,
        userId,
        username,
        photo,
        id: doc.id,
      };
    });
    setTweets(tweets);
  };

  useEffect(() => {
    fetchTweets();
  }, []);

  const onClick = async () => {
    if (!user) return;

    await updateProfile(user, {
      displayName: nameEdit,
    });

    setbEdit(false);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNameEdit(e.target.value);
  };

  return (
    <Layout>
      <Wrapper>
        <AvatarUpload htmlFor="avatar">
          {Boolean(avatar) ? (
            <AvatarImg src={avatar as string} />
          ) : (
            <svg
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
            </svg>
          )}
        </AvatarUpload>
        <AvatarInput
          onChange={onAvatarChange}
          id="avatar"
          type="file"
          accept="image/*"
        />

        {bEdit && (
          <Name>
            <EditInput onChange={onChange} type="text" />{" "}
            <span onClick={onClick}>수정</span>
          </Name>
        )}
        {!bEdit && (
          <Name>
            {user?.displayName ? user.displayName : "손오공"}
            <span onClick={() => setbEdit(true)}>Edit</span>
          </Name>
        )}
        <Tweets>
          {tweets.map((tweet) => (
            <Tweet key={tweet.id} {...tweet} />
          ))}
        </Tweets>
      </Wrapper>
    </Layout>
  );
}
