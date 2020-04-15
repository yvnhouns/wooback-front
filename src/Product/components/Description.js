import React from "react";

import { SimpleTextField } from "../../components/TextFieldMUI";

export default ({ classes }) => (
  <>
    <SimpleTextField
      placeholder="Description"
      className={classes.textField}
      name="description"
      multiline
      rows="5"
      label="Description"
    />

    <SimpleTextField
      placeholder="Description complete"
      className={classes.textField}
      name="short_description"
      multiline
      rows="5"
      label="Description complete"
    />
  </>
);
