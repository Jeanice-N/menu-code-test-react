/* eslint-disable import/prefer-default-export */
import gql from "graphql-tag";

export const GET_MENU = gql`
  query {
    menu {
        starters {
            id
            name
            price
          }
          mains {
            id 
            name
            price
          }
          desserts {
            id
            name
            price
          }
    }
  }
`;
