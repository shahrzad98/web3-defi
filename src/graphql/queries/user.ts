import gql from "graphql-tag";

export const USER = gql`
  query user($id: String) {
    user(id: $id) {
      id
      totalStaked
    }
  }
`;

export const userQueryVars = {
  id: "0",
};
