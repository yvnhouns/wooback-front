import React, { useContext } from "react";
import Notifier from "./Notifier";

import AdminContext from "../context/AdminContext";

const Alert = () => {
  const context = useContext(AdminContext);
  const { success, error, next: rootNext, initialize } = context.alert;

  const next = () => {
    rootNext && rootNext();
    initialize();
  };

  return (
    <>
      <Notifier notificationType="success" message={success} nextClose={next} />
      <Notifier notificationType="error" message={error} nextClose={next} />
    </>
  );
};

export default React.memo(Alert, true);
