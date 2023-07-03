import React from "react";
import { Breadcrumb } from "antd";

interface CustomBreadcrumbProps {
  text: string;
  text2: string;
}

const BreadCrumbTwo = (Props: CustomBreadcrumbProps) => {
  return (
    <Breadcrumb className="fs-6" separator=">">
    <Breadcrumb.Item>{Props.text}</Breadcrumb.Item>
    <Breadcrumb.Item className="fw-bold custom-color">{Props.text2}</Breadcrumb.Item>
  
  </Breadcrumb>
  )
}

export default BreadCrumbTwo;