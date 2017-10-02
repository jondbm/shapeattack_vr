import {
  VIEWING_EXHIBITS, GET_EXHIBIT,
} from "../../actions/Exhibition";

const initialState = {
  exhibitId: null,
  viewingExhibits: false
};

export default (state = initialState, action) => {
  switch (action.type) {
  case VIEWING_EXHIBITS:
    return {
      ...state,
      viewingExhibits: true,
      exhibitId: action.exhibitId,
    };
    case GET_EXHIBIT:
    return {
      ...state,
      getExhibit: action.getExhibit,
    };
  default:
    return state;
  }
};
