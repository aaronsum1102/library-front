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

export type AddResourceInput = {
  title: Scalars['String'];
  createdDate?: Maybe<Scalars['Float']>;
  ebook: Scalars['Boolean'];
  available?: Maybe<Scalars['Boolean']>;
  borrowerId?: Maybe<Scalars['String']>;
  borrower?: Maybe<BorrowerInput>;
};

export type AddUserInput = {
  email: Scalars['String'];
  admin: Scalars['Boolean'];
};

export type BorrowResourceInput = {
  title: Scalars['String'];
  createdDate: Scalars['Float'];
  ebook: Scalars['Boolean'];
  available: Scalars['Boolean'];
  borrowerId: Scalars['String'];
  borrower: BorrowerInput;
};

export type Borrower = {
  __typename?: 'Borrower';
  name?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
};

export type BorrowerInput = {
  name: Scalars['String'];
  phoneNumber: Scalars['String'];
};

export type LoanResource = {
  __typename?: 'LoanResource';
  title: Scalars['String'];
  createdDate: Scalars['Float'];
  ebook: Scalars['Boolean'];
  available: Scalars['Boolean'];
  borrowerId: Scalars['String'];
  borrower: Borrower;
  dateBorrowed: Scalars['String'];
  dueDate: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  verifyUser: Scalars['Boolean'];
  addUser: User;
  updateUserInfo: User;
  addResource: Resource;
  borrowResource: Resource;
  returnResource: Resource;
  removeResource: Scalars['Boolean'];
};

export type MutationVerifyUserArgs = {
  email: Scalars['String'];
};

export type MutationAddUserArgs = {
  input: AddUserInput;
};

export type MutationUpdateUserInfoArgs = {
  input: UpdateUserInput;
};

export type MutationAddResourceArgs = {
  input: AddResourceInput;
};

export type MutationBorrowResourceArgs = {
  input: BorrowResourceInput;
};

export type MutationReturnResourceArgs = {
  input: ReturnResourceInput;
};

export type MutationRemoveResourceArgs = {
  input: RemoveResourceInput;
};

export type Query = {
  __typename?: 'Query';
  users: Array<Maybe<User>>;
  user?: Maybe<User>;
  resources: Array<Resource>;
  resourcesByUser: Array<LoanResource>;
};

export type QueryUserArgs = {
  email: Scalars['String'];
};

export type QueryResourcesByUserArgs = {
  borrowerId: Scalars['String'];
};

export type RemoveResourceInput = {
  title: Scalars['String'];
  createdDate: Scalars['Float'];
};

export type Resource = {
  __typename?: 'Resource';
  title: Scalars['String'];
  createdDate: Scalars['Float'];
  ebook: Scalars['Boolean'];
  available: Scalars['Boolean'];
  borrowerId?: Maybe<Scalars['String']>;
  borrower?: Maybe<Borrower>;
  dateBorrowed?: Maybe<Scalars['String']>;
  dueDate?: Maybe<Scalars['String']>;
};

export type ReturnResourceInput = {
  title: Scalars['String'];
  createdDate: Scalars['Float'];
  ebook: Scalars['Boolean'];
  available: Scalars['Boolean'];
};

export type UpdateUserInput = {
  uid: Scalars['ID'];
  displayName: Scalars['String'];
  phoneNumber: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  uid: Scalars['String'];
  email: Scalars['String'];
  displayName?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  admin: Scalars['Boolean'];
};

export type AddResourceMutationVariables = Exact<{
  input: AddResourceInput;
}>;

export type AddResourceMutation = { __typename?: 'Mutation' } & {
  addResource: { __typename?: 'Resource' } & Pick<Resource, 'title' | 'createdDate'>;
};

export type AddUserMutationVariables = Exact<{
  input: AddUserInput;
}>;

export type AddUserMutation = { __typename?: 'Mutation' } & {
  addUser: { __typename?: 'User' } & Pick<User, 'uid'>;
};

export type BorrowResourceMutationVariables = Exact<{
  input: BorrowResourceInput;
}>;

export type BorrowResourceMutation = { __typename?: 'Mutation' } & {
  borrowResource: { __typename?: 'Resource' } & Pick<
    Resource,
    'title' | 'createdDate' | 'dateBorrowed'
  >;
};

export type RemoveResourceMutationVariables = Exact<{
  input: RemoveResourceInput;
}>;

export type RemoveResourceMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'removeResource'>;

export type ReturnMaterialMutationVariables = Exact<{
  input: ReturnResourceInput;
}>;

export type ReturnMaterialMutation = { __typename?: 'Mutation' } & {
  returnMaterial: { __typename?: 'Resource' } & Pick<Resource, 'title' | 'createdDate'>;
};

export type UpdateUserInfoMutationVariables = Exact<{
  input: UpdateUserInput;
}>;

export type UpdateUserInfoMutation = { __typename?: 'Mutation' } & {
  updateUserInfo: { __typename?: 'User' } & Pick<
    User,
    'uid' | 'email' | 'displayName' | 'phoneNumber' | 'admin'
  >;
};

export type VerifyUserMutationVariables = Exact<{
  email: Scalars['String'];
}>;

export type VerifyUserMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'verifyUser'>;

export type LoansQueryVariables = Exact<{
  borrowerId: Scalars['String'];
}>;

export type LoansQuery = { __typename?: 'Query' } & {
  loans: Array<
    { __typename?: 'LoanResource' } & Pick<
      LoanResource,
      'title' | 'createdDate' | 'ebook' | 'available' | 'dateBorrowed' | 'dueDate'
    >
  >;
};

export type ResourcesQueryVariables = Exact<{ [key: string]: never }>;

export type ResourcesQuery = { __typename?: 'Query' } & {
  resources: Array<
    { __typename?: 'Resource' } & Pick<
      Resource,
      'title' | 'createdDate' | 'ebook' | 'available' | 'borrowerId' | 'dateBorrowed' | 'dueDate'
    > & { borrower?: Maybe<{ __typename?: 'Borrower' } & Pick<Borrower, 'name' | 'phoneNumber'>> }
  >;
};

export type UsersQueryVariables = Exact<{ [key: string]: never }>;

export type UsersQuery = { __typename?: 'Query' } & {
  users: Array<
    Maybe<
      { __typename?: 'User' } & Pick<
        User,
        'uid' | 'email' | 'displayName' | 'phoneNumber' | 'admin'
      >
    >
  >;
};

export const AddResourceDocument = gql`
  mutation addResource($input: AddResourceInput!) {
    addResource(input: $input) {
      title
      createdDate
    }
  }
`;
export type AddResourceMutationFn = ApolloReactCommon.MutationFunction<
  AddResourceMutation,
  AddResourceMutationVariables
>;

/**
 * __useAddResourceMutation__
 *
 * To run a mutation, you first call `useAddResourceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddResourceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addResourceMutation, { data, loading, error }] = useAddResourceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddResourceMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    AddResourceMutation,
    AddResourceMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<AddResourceMutation, AddResourceMutationVariables>(
    AddResourceDocument,
    options
  );
}
export type AddResourceMutationHookResult = ReturnType<typeof useAddResourceMutation>;
export type AddResourceMutationResult = ApolloReactCommon.MutationResult<AddResourceMutation>;
export type AddResourceMutationOptions = ApolloReactCommon.BaseMutationOptions<
  AddResourceMutation,
  AddResourceMutationVariables
>;
export const AddUserDocument = gql`
  mutation addUser($input: AddUserInput!) {
    addUser(input: $input) {
      uid
    }
  }
`;
export type AddUserMutationFn = ApolloReactCommon.MutationFunction<
  AddUserMutation,
  AddUserMutationVariables
>;

/**
 * __useAddUserMutation__
 *
 * To run a mutation, you first call `useAddUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addUserMutation, { data, loading, error }] = useAddUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddUserMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<AddUserMutation, AddUserMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<AddUserMutation, AddUserMutationVariables>(
    AddUserDocument,
    options
  );
}
export type AddUserMutationHookResult = ReturnType<typeof useAddUserMutation>;
export type AddUserMutationResult = ApolloReactCommon.MutationResult<AddUserMutation>;
export type AddUserMutationOptions = ApolloReactCommon.BaseMutationOptions<
  AddUserMutation,
  AddUserMutationVariables
>;
export const BorrowResourceDocument = gql`
  mutation borrowResource($input: BorrowResourceInput!) {
    borrowResource(input: $input) {
      title
      createdDate
      dateBorrowed
    }
  }
`;
export type BorrowResourceMutationFn = ApolloReactCommon.MutationFunction<
  BorrowResourceMutation,
  BorrowResourceMutationVariables
>;

/**
 * __useBorrowResourceMutation__
 *
 * To run a mutation, you first call `useBorrowResourceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBorrowResourceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [borrowResourceMutation, { data, loading, error }] = useBorrowResourceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useBorrowResourceMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    BorrowResourceMutation,
    BorrowResourceMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<BorrowResourceMutation, BorrowResourceMutationVariables>(
    BorrowResourceDocument,
    options
  );
}
export type BorrowResourceMutationHookResult = ReturnType<typeof useBorrowResourceMutation>;
export type BorrowResourceMutationResult = ApolloReactCommon.MutationResult<BorrowResourceMutation>;
export type BorrowResourceMutationOptions = ApolloReactCommon.BaseMutationOptions<
  BorrowResourceMutation,
  BorrowResourceMutationVariables
>;
export const RemoveResourceDocument = gql`
  mutation removeResource($input: RemoveResourceInput!) {
    removeResource(input: $input)
  }
`;
export type RemoveResourceMutationFn = ApolloReactCommon.MutationFunction<
  RemoveResourceMutation,
  RemoveResourceMutationVariables
>;

/**
 * __useRemoveResourceMutation__
 *
 * To run a mutation, you first call `useRemoveResourceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveResourceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeResourceMutation, { data, loading, error }] = useRemoveResourceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRemoveResourceMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    RemoveResourceMutation,
    RemoveResourceMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<RemoveResourceMutation, RemoveResourceMutationVariables>(
    RemoveResourceDocument,
    options
  );
}
export type RemoveResourceMutationHookResult = ReturnType<typeof useRemoveResourceMutation>;
export type RemoveResourceMutationResult = ApolloReactCommon.MutationResult<RemoveResourceMutation>;
export type RemoveResourceMutationOptions = ApolloReactCommon.BaseMutationOptions<
  RemoveResourceMutation,
  RemoveResourceMutationVariables
>;
export const ReturnMaterialDocument = gql`
  mutation returnMaterial($input: ReturnResourceInput!) {
    returnMaterial: returnResource(input: $input) {
      title
      createdDate
    }
  }
`;
export type ReturnMaterialMutationFn = ApolloReactCommon.MutationFunction<
  ReturnMaterialMutation,
  ReturnMaterialMutationVariables
>;

/**
 * __useReturnMaterialMutation__
 *
 * To run a mutation, you first call `useReturnMaterialMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReturnMaterialMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [returnMaterialMutation, { data, loading, error }] = useReturnMaterialMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useReturnMaterialMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ReturnMaterialMutation,
    ReturnMaterialMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<ReturnMaterialMutation, ReturnMaterialMutationVariables>(
    ReturnMaterialDocument,
    options
  );
}
export type ReturnMaterialMutationHookResult = ReturnType<typeof useReturnMaterialMutation>;
export type ReturnMaterialMutationResult = ApolloReactCommon.MutationResult<ReturnMaterialMutation>;
export type ReturnMaterialMutationOptions = ApolloReactCommon.BaseMutationOptions<
  ReturnMaterialMutation,
  ReturnMaterialMutationVariables
>;
export const UpdateUserInfoDocument = gql`
  mutation updateUserInfo($input: UpdateUserInput!) {
    updateUserInfo(input: $input) {
      uid
      email
      displayName
      phoneNumber
      admin
    }
  }
`;
export type UpdateUserInfoMutationFn = ApolloReactCommon.MutationFunction<
  UpdateUserInfoMutation,
  UpdateUserInfoMutationVariables
>;

/**
 * __useUpdateUserInfoMutation__
 *
 * To run a mutation, you first call `useUpdateUserInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserInfoMutation, { data, loading, error }] = useUpdateUserInfoMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserInfoMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateUserInfoMutation,
    UpdateUserInfoMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<UpdateUserInfoMutation, UpdateUserInfoMutationVariables>(
    UpdateUserInfoDocument,
    options
  );
}
export type UpdateUserInfoMutationHookResult = ReturnType<typeof useUpdateUserInfoMutation>;
export type UpdateUserInfoMutationResult = ApolloReactCommon.MutationResult<UpdateUserInfoMutation>;
export type UpdateUserInfoMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateUserInfoMutation,
  UpdateUserInfoMutationVariables
>;
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
export const LoansDocument = gql`
  query loans($borrowerId: String!) {
    loans: resourcesByUser(borrowerId: $borrowerId) {
      title
      createdDate
      ebook
      available
      dateBorrowed
      dueDate
    }
  }
`;

/**
 * __useLoansQuery__
 *
 * To run a query within a React component, call `useLoansQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoansQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoansQuery({
 *   variables: {
 *      borrowerId: // value for 'borrowerId'
 *   },
 * });
 */
export function useLoansQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<LoansQuery, LoansQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<LoansQuery, LoansQueryVariables>(LoansDocument, options);
}
export function useLoansLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<LoansQuery, LoansQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<LoansQuery, LoansQueryVariables>(LoansDocument, options);
}
export type LoansQueryHookResult = ReturnType<typeof useLoansQuery>;
export type LoansLazyQueryHookResult = ReturnType<typeof useLoansLazyQuery>;
export type LoansQueryResult = ApolloReactCommon.QueryResult<LoansQuery, LoansQueryVariables>;
export function refetchLoansQuery(variables?: LoansQueryVariables) {
  return { query: LoansDocument, variables: variables };
}
export const ResourcesDocument = gql`
  query resources {
    resources {
      title
      createdDate
      ebook
      available
      borrowerId
      borrower {
        name
        phoneNumber
      }
      dateBorrowed
      dueDate
    }
  }
`;

/**
 * __useResourcesQuery__
 *
 * To run a query within a React component, call `useResourcesQuery` and pass it any options that fit your needs.
 * When your component renders, `useResourcesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useResourcesQuery({
 *   variables: {
 *   },
 * });
 */
export function useResourcesQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<ResourcesQuery, ResourcesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<ResourcesQuery, ResourcesQueryVariables>(
    ResourcesDocument,
    options
  );
}
export function useResourcesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ResourcesQuery, ResourcesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<ResourcesQuery, ResourcesQueryVariables>(
    ResourcesDocument,
    options
  );
}
export type ResourcesQueryHookResult = ReturnType<typeof useResourcesQuery>;
export type ResourcesLazyQueryHookResult = ReturnType<typeof useResourcesLazyQuery>;
export type ResourcesQueryResult = ApolloReactCommon.QueryResult<
  ResourcesQuery,
  ResourcesQueryVariables
>;
export function refetchResourcesQuery(variables?: ResourcesQueryVariables) {
  return { query: ResourcesDocument, variables: variables };
}
export const UsersDocument = gql`
  query users {
    users {
      uid
      email
      displayName
      phoneNumber
      admin
    }
  }
`;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<UsersQuery, UsersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
}
export function useUsersLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
}
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = ApolloReactCommon.QueryResult<UsersQuery, UsersQueryVariables>;
export function refetchUsersQuery(variables?: UsersQueryVariables) {
  return { query: UsersDocument, variables: variables };
}
