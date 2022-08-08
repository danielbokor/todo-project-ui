import { gql } from "@apollo/client";

export const REFRESH_ACCESS_TOKEN = gql`
  mutation RefreshAccessToken($refreshToken: String!) {
    refreshAccessToken(refreshToken: $refreshToken) {
      accessToken
    }
  }
`;

export interface AccessToken {
  accessToken: string;
}
