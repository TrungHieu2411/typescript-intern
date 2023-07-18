import { Breadcrumb } from "antd";

interface CustomBreadcrumbProps {
  text: string;
}

const BreadCrumbOne = (Props: CustomBreadcrumbProps) => {
  return (
    <Breadcrumb className="fs-6" separator=">">
      <Breadcrumb.Item className="fw-bold custom-color">
        {Props.text}
      </Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default BreadCrumbOne;
