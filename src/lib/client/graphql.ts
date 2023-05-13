import { GraphQLClient } from 'graphql-request';
import { constants } from '../helpers';

const endpoint = `${constants.BASE_URL}api/graphql`; //  process?.env?.NEXT_PUBLIC_GRAPHQL_ENDPOINT ??
const controller = new AbortController();

export const client = new GraphQLClient(endpoint, {
  credentials: 'include',
  mode: 'cors',
  signal: controller?.signal,
});
