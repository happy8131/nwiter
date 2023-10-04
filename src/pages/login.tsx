import {
  Error,
  Form,
  Input,
  Switcher,
  Title,
  Wrapper,
} from "../components/authComponent";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";
import { auth } from "../../firebase";
import styled from "styled-components";

const MenuItem = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  border-color: d4d1e8;
  margin-bottom: 5px;
  svg {
    width: 30px;
    fill: #d4d1e8;
  }
`;

export default function Login() {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (isLoading || email === "" || password === "") return;
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (e: any) {
      console.log("회원가입err", e);
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
      //   setError(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <Link href="/">
        <MenuItem>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.0}
            stroke="currentColor"
            className="w-1 h-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
        </MenuItem>
      </Link>
      <Title>로그인</Title>
      <Form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          name="email"
          value={email}
          placeholder="이메일"
          type="email"
          required
        />
        <Input
          onChange={onChange}
          name="password"
          value={password}
          placeholder="비밀번호"
          type="password"
          required
        />
        <Input type="submit" value={isLoading ? "Loading..." : "로그인"} />
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
      <Switcher>
        아이디가 없으세요?
        <Link href="/signup">
          <a>회원가입 &rarr;</a>
        </Link>
      </Switcher>
    </Wrapper>
  );
}
