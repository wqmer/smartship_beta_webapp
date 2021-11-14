import Table from "./Table";
import ProcessingPage from "./ProcessingPage";
import ExportForm from "./ExportForm";
import AddressVerifyForm from "./AddressVerifyForm";
import React, { Component, PropTypes } from "react";

const componentMapName = (name, props = undefined) => {
  switch (name) {
    case "table":
      return <Table {...props} />;
    case "processing_page":
      return <ProcessingPage {...props} />;
    case "AddressForm":
      return <AddressVerifyForm {...props} />;
    case "ExportForm":
      return <ExportForm {...props} />;
    default:
      return undefined;
  }
};

export default componentMapName;
