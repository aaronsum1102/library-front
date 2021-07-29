import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: 'Mutation';
  verifyUser: Scalars['Boolean'];
};

export type MutationVerifyUserArgs = {
  email: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  user?: Maybe<User>;
};

export type QueryUserArgs = {
  email: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  uid: Scalars['String'];
  email: Scalars['String'];
  displayName?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  customClaims?: Maybe<UserCustomClaims>;
};

export type UserCustomClaims = {
  __typename?: 'UserCustomClaims';
  admin?: Maybe<Scalars['Boolean']>;
};

export type VerifyUserMutationVariables = Exact<{
  email: Scalars['String'];
}>;

export type VerifyUserMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'verifyUser'>;

export type UserQueryVariables = Exact<{
  email: Scalars['String'];
}>;

export type UserQuery = { __typename?: 'Query' } & {
  user?: Maybe<
    { __typename?: 'User' } & Pick<User, 'uid' | 'email' | 'displayName' | 'phoneNumber'> & {
        customClaims?: Maybe<{ __typename?: 'UserCustomClaims' } & Pick<UserCustomClaims, 'admin'>>;
      }
  >;
};

export const VerifyUserDocument = gql`
  mutation verifyUser($email: String!) {
    verifyUser(email: $email)
  }
`;
export type VerifyUserMutationFn = ApolloReactCommon.MutationFunction<
  VerifyUserMutation,
  VerifyUserMutationVariables
>;

/**
 * __useVerifyUserMutation__
 *
 * To run a mutation, you first call `useVerifyUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyUserMutation, { data, loading, error }] = useVerifyUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useVerifyUserMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    VerifyUserMutation,
    VerifyUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<VerifyUserMutation, VerifyUserMutationVariables>(
    VerifyUserDocument,
    options
  );
}
export type VerifyUserMutationHookResult = ReturnType<typeof useVerifyUserMutation>;
export type VerifyUserMutationResult = ApolloReactCommon.MutationResult<VerifyUserMutation>;
export type VerifyUserMutationOptions = ApolloReactCommon.BaseMutationOptions<
  VerifyUserMutation,
  VerifyUserMutationVariables
>;
export const UserDocument = gql`
  query user($email: String!) {
    user(email: $email) {
      uid
      email
      displayName
      phoneNumber
      customClaims {
        admin
      }
    }
  }
`;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useUserQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<UserQuery, UserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
}
export function useUserLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UserQuery, UserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
}
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = ApolloReactCommon.QueryResult<UserQuery, UserQueryVariables>;
export function refetchUserQuery(variables?: UserQueryVariables) {
  return { query: UserDocument, variables: variables };
}
