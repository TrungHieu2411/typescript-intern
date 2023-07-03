import Link from "antd/es/typography/Link";
import React from "react";

interface Accounts {
    link: string;
    img: string;
    hello: string;
    name: string;
}
const Account = (Props: Accounts) => {
  return (
    <>
      <Link href={Props.link}>
        <img
          style={{
            width: 40,
            height: 40,
            marginLeft: 10,
            borderRadius: "50%",
          }}
          src={Props.img}
          alt=""
        />
      </Link>

      <span className="ms-2">
        <Link
          href={"/admin"}
          className="text-decoration-none"
          style={{ color: "black" }}
        >
          <p className="mb-0">{Props.hello}</p>
          <p className="mb-0 fw-bold">{Props.name}</p>
        </Link>
      </span>
    </>
  );
};

export default Account;
