import React from "react";
import { Button, Result } from "antd";

const Unauthorized: React.FC = () => (
  <Result
  status={"403"}
    title="403"
    subTitle="Sorry, the page you visited does not exist."
    extra={
      <Button type="primary" href="/">
        Back Home
      </Button>
    }
  />
);

export default Unauthorized;
