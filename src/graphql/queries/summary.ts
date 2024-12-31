import gql from "graphql-tag";

export const SUMMARY = gql`
  query summary($id: ID) {
    summary(id: $id) {
      id
      totalPools
      totalStaked
    }
  }
`;

export const summaryQueryVars = {
  id: 1,
};
