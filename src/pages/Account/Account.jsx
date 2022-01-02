import React from "react";
import AccountForm from "../../components/AccountForm/AccountForm";
import PageContainer from "../../components/UI/PageContainer";
import PageHeader from "../../components/UI/PageHeader";

const Account = () => {
  return (
    <>
      <PageHeader title="Account" subTitle="User profile" />
      <PageContainer>
        <AccountForm />
      </PageContainer>
    </>
  );
};

export default Account;
