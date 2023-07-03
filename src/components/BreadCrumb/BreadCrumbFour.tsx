import React from "react";
import { Breadcrumb } from "antd";

interface CustomBreadcrumbProps {
  text: string;
  text2: string;
  text3: string;
  text4: string;
  href: string;
  href2: string;
}

const BreadCrumbFour = (Props: CustomBreadcrumbProps) => {
  return (
    <Breadcrumb className="fs-6" separator=">">
    <Breadcrumb.Item>{Props.text}</Breadcrumb.Item>
    <Breadcrumb.Item
      className="text-decoration-none"
      href={Props.href}
    >
      {Props.text2}
    </Breadcrumb.Item>
    <Breadcrumb.Item
      className="text-decoration-none"
      href={Props.href2}
    >
      {Props.text3}
    </Breadcrumb.Item>
    <Breadcrumb.Item className="fw-bold custom-color">
      {Props.text4}
    </Breadcrumb.Item>
  </Breadcrumb>
  );
};

export default BreadCrumbFour;
