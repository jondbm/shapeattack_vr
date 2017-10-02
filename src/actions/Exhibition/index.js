export const GET_EXHIBIT = "GET_EXHIBIT";
export const VIEWING_EXHIBITS = "VIEWING_EXHIBITS";

export const viewingExhibits = exhibitId => ({
  type: VIEWING_EXHIBITS,
  exhibitId: exhibitId
});

export const getExhibit = getExhibit => ({
  type: GET_EXHIBIT,
  getExhibit: getExhibit,
});

export const viewExhibito = exhibitId => (dispatch) => {
  dispatch(viewingExhibits(exhibitId));
}