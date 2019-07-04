import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import api from "../../../utils/api";

const POSTSLIST = "talk/POSTSLIST";

const postsList = createAction(POSTSLIST);

const initState = {
  postsList: [],

  filter: `postsCategoryIndex eq 1`,
  order:`createdAt DESC`,
};

const token1 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbkluZGV4IjozOTQsInRva2VuSWQiOiJzaHMwNjU1QGdtYWlsLmNvbSIsInRva2VuTmlja25hbWUiOiJIUyIsInRva2VuTWFqb3IiOiLshJzslpHtmZQg7KCE6rO1IiwidG9rZW5NaW5vciI6bnVsbCwidG9rZW5Eb3VibGVNYWpvciI6bnVsbCwidG9rZW5Db25uZWN0ZWRNYWpvciI6bnVsbCwidG9rZW5JblZhbGlkYXRpb24iOjAsInRva2VuQXZhdGFyIjoiaHR0cHM6Ly9kdi1oYW5kYW0uczMuYXAtbm9ydGhlYXN0LTIuYW1hem9uYXdzLmNvbS9hdmF0YXIvMTU1OTU0MzkyMjAxNjAucG5nIiwidG9rZW5TdGF0dXMiOiJBQ1RJVkUiLCJpYXQiOjE1NjIyMTYzMzR9.gT82YHk2Q331YBUAFIF4oR9-aOhbLZ1OnBpBxEkhUlI';

export const pageListPosts = () => async dispatch => {
    api.get(`/posts/?page=1&count=4`,{token: token1});
    dispatch(postsList);
};

export default handleActions(
  {
    [POSTSLIST]: (state, action) =>
      produce(state, draft => {
        draft.postsList;
      }),
    
  },
  initState
);
