import { useState } from "react";

export const Register = () => {
  const [email, setEmail] = useState("abcd@gmail.com");
  const [password, setPassword] = useState("123456");
  const [name, setName] = useState("abcd");
  const [imgUrl, setImgUrl] = useState("https://abcd.com");
  return (
    <div className="bg-amber-50 p-5">
      Register
      <form className="flex flex-col pl-5 gap-2 showBorder parent [&>input]:border-2 [&>*]:border-gray-400">
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="abc@gmail.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required
        />
        <label>Password</label>
        <input
          type="password"
          name="passwor"
          placeholder="123456"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
        />
        <label>Name</label>
        <input
          type="text"
          name="name"
          placeholder="abc"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          required
        />
        <label>Image URL</label>
        <input
          type="text"
          name="imgUrl"
          placeholder=""
          value={imgUrl}
          onChange={(e) => {
            setImgUrl(e.target.value);
          }}
          required
        />
        <button
          className="bg-gray-200 rounded-md cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            console.log(email, password, name, imgUrl);
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};
