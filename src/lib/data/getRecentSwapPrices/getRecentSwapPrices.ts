import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import {
    RecentSwapPricesQuery,
    RecentSwapPricesQueryVariables,
} from '@/lib/graphql/generated/types'
import { recentSwapPricesQuery } from '@/lib/graphql/queries'

const getRecentSwapPrices = async (
    limit?: number
): Promise<RecentSwapPricesQuery['recentSwapPrices']> => {
    const graphqlClient = createGraphqlClient()

    const result = await graphqlClient
        .query<
            RecentSwapPricesQuery,
            RecentSwapPricesQueryVariables
        >(recentSwapPricesQuery, { limit: limit || null })
        .toPromise()

    if (result.error) {
        throw result.error
    }

    return result.data?.recentSwapPrices || []
}

export default getRecentSwapPrices
