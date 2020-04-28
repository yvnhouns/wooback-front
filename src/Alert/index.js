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
      <Notifier
        notificationType="success"
        message={typeof success !== "object" ? success : "succès"}
        nextClose={next}
      />
      <Notifier
        notificationType="error"
        message={typeof error !== "object" ? error : "error"}
        nextClose={next}
      />
    </>
  );
};

export default React.memo(Alert, true);
