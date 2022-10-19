import React from "react";
import HighlightIcon from "@material-ui/icons/Highlight";
import { LocalHospital } from "../../../../node_modules/@material-ui/icons/index";

function Header() {
  return (
    <header>
      <h1>
        HCARE
        <LocalHospital />
      </h1>
    </header>
  );
}

export default Header;
