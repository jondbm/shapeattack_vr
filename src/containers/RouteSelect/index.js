import React from "react";
import { string, bool } from "prop-types";
import { connect } from "react-redux";

import ButtonView from "../ButtonView"
import WaitingRoomView from "../WaitingRoomView";
import ExhibitRoomView from "../ExhibitRoomView";
import ImageView from "../ImageView";

const RouteSelect = ({ viewingExhibits }) => {
   if (viewingExhibits) {
    return <ExhibitRoomView />;
  }

  return <WaitingRoomView />;
};

RouteSelect.propTypes = {
  viewingExhibits: bool,
};

RouteSelect.defaultProps = {
  viewingExhibits: false,
};

const mapStateToProps = ({ viewingExhibits: viewingExhibits }) => ({
  viewingExhibits,
});

export default connect(mapStateToProps)(RouteSelect);
