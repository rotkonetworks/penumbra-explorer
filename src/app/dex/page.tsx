// istanbul ignore file
import { notFound } from 'next/navigation'
import { FC } from 'react'
import {
    Breadcrumb,
    Breadcrumbs,
    Container,
    FilterSelector,
    TimeRangeSelector,
} from '@/components'
import {
    DexExecutionContainer,
    DexExecutionPanelContainer,
    DexMarketOverviewContainer,
    DexPositionPanelContainer,
    DexPositionTableContainer,
    DexPriceTableContainer,
    DexVolumeHistoryContainer,
} from '@/containers'
import { LiquidityPositionStateFilter } from '@/lib/graphql/generated/types'
import { generatePageMetadata } from '@/lib/utils'

export const metadata = generatePageMetadata(
    'DEX',
    'Explore DEX liquidity positions and swap executions on the Penumbra ' +
        'blockchain. View liquidity reserves, fee tier, execution routes and ' +
        'more on Noctis - a fast, secure, and privacy-focused explorer built ' +
        'for Penumbra blockchain.',
    '/dex'
)

interface Props {
    searchParams: Promise<{
        filter?: string
        page?: string
        range?: string
    }>
}

const DexPage: FC<Props> = async props => {
    const searchParams = await props.searchParams
    const page = searchParams.page ? Number(searchParams.page) - 1 : 0

    if (Number.isNaN(page) || page < 0) {
        notFound()
    }

    const length = 13
    const offset = page * length

    return (
        <Container>
            <Breadcrumbs>
                <Breadcrumb href="/">Explore</Breadcrumb>
                <Breadcrumb>DEX</Breadcrumb>
            </Breadcrumbs>
            <div className="flex flex-col gap-4 sm:flex-row">
                <DexExecutionPanelContainer className="flex-1" />
                <DexPositionPanelContainer className="flex-1" />
            </div>
            <DexVolumeHistoryContainer
                className="mt-4"
                days={
                    searchParams.range === '7'
                        ? 7
                        : searchParams.range === '90'
                          ? 90
                          : searchParams.range === '365'
                            ? 365
                            : 30
                }
                timeRangeSelector={
                    <TimeRangeSelector
                        paramName="range"
                        ranges={[
                            { label: '30d', value: '30' },
                            { label: '7d', value: '7' },
                            { label: '90d', value: '90' },
                            { label: '1y', value: '365' },
                        ]}
                        selectedRange={searchParams.range || '30'}
                    />
                }
            />
            <div className="mt-4 grid gap-4 lg:grid-cols-2">
                <DexMarketOverviewContainer />
                <DexPriceTableContainer />
            </div>
            <div className="mt-4 flex flex-col-reverse gap-4 lg:flex-row">
                <DexExecutionContainer />
                <DexPositionTableContainer
                    className="lg:min-w-0 lg:flex-1"
                    header={
                        <div className="flex flex-col gap-6">
                            <h1 className="text-2xl font-medium">
                                Liquidity positions
                            </h1>
                            <FilterSelector
                                filters={['open', 'closed']}
                                selectedFilter={searchParams.filter}
                            />
                        </div>
                    }
                    limit={{ length, offset }}
                    stateFilter={
                        searchParams.filter === 'closed'
                            ? LiquidityPositionStateFilter.Closed
                            : LiquidityPositionStateFilter.Open
                    }
                    pagination
                />
            </div>
        </Container>
    )
}

export default DexPage
