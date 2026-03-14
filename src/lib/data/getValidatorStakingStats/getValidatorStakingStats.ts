import createGraphqlClient from '@/lib/graphql/createGraphqlClient'
import {
    ValidatorStakingStatsQuery,
    ValidatorStakingStatsQueryVariables,
} from '@/lib/graphql/generated/types'
import { validatorStakingStatsQuery } from '@/lib/graphql/queries'

const getValidatorStakingStats = async (
    validatorId: string
): Promise<null | ValidatorStakingStatsQuery['validatorStakingStats']> => {
    const graphqlClient = createGraphqlClient()

    const result = await graphqlClient
        .query<ValidatorStakingStatsQuery, ValidatorStakingStatsQueryVariables>(
            validatorStakingStatsQuery,
            {
                validatorId,
            }
        )
        .toPromise()

    if (result.error) {
        throw result.error
    }

    return result.data?.validatorStakingStats || null
}

export default getValidatorStakingStats
