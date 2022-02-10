/**
 * Configuration to retrieve the access token for a user with
 * the `OWNER` type.
 *
 * @remarks
 * - {@link https://www.onespan.com/blog/onespan-sign-release-1134-api-token-client-application | API token for Client Application}
 *
 * @public
 */
export interface AccessTokenOwnerConfig {
  clientId: string;
  secret: string;
  type: 'OWNER';
}

/**
 * Configuration to retrieve the access token for a user with
 * the `SENDER` type.
 *
 * @remarks
 * - {@link https://www.onespan.com/blog/onespan-sign-release-1134-api-token-client-application | API token for Client Application}
 *
 * @public
 */
export interface AccessTokenSenderConfig {
  clientId: string;
  secret: string;
  type: 'SENDER';
  email: string;
}
