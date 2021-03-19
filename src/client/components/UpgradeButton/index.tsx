import { PaidPlan } from "@client/graphql/types.generated";
import React from "react";

const UpgradeButton = () => {
  function doSomething() {
    const x = PaidPlan.Pro;
    console.log(x);
  }

  return <button onClick={doSomething}>Upgrade</button>;
};

export default UpgradeButton;
