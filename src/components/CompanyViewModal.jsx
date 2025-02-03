import BaseModal from "./BaseModal";
import React from "react";

function CompanyViewModal({ showModal, showModalHandler, companyData }) {
  let displayData = <></>;

  if (companyData) {
    const { sector, beta, industry, companyName, raw } = companyData;
    const { description, ceo } = raw;
    displayData = (
      <>
        Company: {companyName}
        <br />
        CEO: {ceo}
        <br />
        <br />
        Industry: {industry}
        <br />
        Sector: {sector}
        <br />
        beta: {beta}
        <br />
        <br />
        Description: {description}
        <br />
      </>
    );
  }

  return (
    <div style={{ backgroundColor: "red" }}>
      <BaseModal
        showModal={showModal}
        modalHandler={showModalHandler}
        data={displayData}
        widthVW="80vw"
        heighVHt="80vh"
      />
    </div>
  );
}
const style = {
  // width: "50%",
};

export default CompanyViewModal;
