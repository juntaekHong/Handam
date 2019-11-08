import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import cheerio from "cheerio-without-node-native";
import config from "../../../configs/config";

const SEAT = [0, 198, 202, 0, 55];

const initState = {};

export const getLibraryCount = (room_no = 1) => async dispatch => {
  try {
    const result = await fetch(`${config.readingServer}/reading?room_no=${room_no}`);
    const data = await result.text();
    const $ = cheerio.load(data);
    let total = $(
      "body > center > table:nth-child(3) > tr > td > table > tr:nth-child(2) > td > table > tr > td:nth-child(2) > font:nth-child(2) > b"
    ).text();
    let use = $(
      "body > center > table:nth-child(3) > tr > td > table > tr:nth-child(2) > td > table > tr > td:nth-child(3) > font:nth-child(2) > b"
    ).text();
    let rest = $(
      "body > center > table:nth-child(3) > tr > td > table > tr:nth-child(2) > td > table > tr > td:nth-child(4) > font:nth-child(2) > b"
    ).text();

    const seats = [false];
    for (let i = 1; i <= SEAT[room_no]; i++) {
      const type = $(`#Layer${i} > table:nth-child(1) > tr > td`).attr("bgcolor");
      seats.push(type === "gray" ? false : true);
    }
    return { total, use, rest, seats };
  } catch (e) {
    console.log("err", e);
    return { total: 0, use: 0, rest: 0, seats: [] };
  }
};

export default handleActions({}, initState);
