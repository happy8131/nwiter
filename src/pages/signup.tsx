import {
  Error,
  Form,
  Input,
  Switcher,
  Title,
  Wrapper,
} from "../components/authComponent";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";
import { auth } from "../../firebase";

export default function Signup() {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (isLoading || name === "" || email === "" || password === "") return;
    try {
      setLoading(true);
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(credentials);
      await updateProfile(credentials.user, {
        displayName: name,
      });
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
    console.log(name, email, password);
  };

  return (
    <Wrapper>
      <Title>회원 가입</Title>
      <Form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          name="name"
          value={name}
          placeholder="이름"
          type="text"
          required
        />
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
        <Input type="submit" value={isLoading ? "Loading..." : "회원가입"} />
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
      <Switcher>
        아이디가 있으신가요?
        <Link href="/login">
          <a>로그인 &rarr;</a>
        </Link>
      </Switcher>
    </Wrapper>
  );
}
