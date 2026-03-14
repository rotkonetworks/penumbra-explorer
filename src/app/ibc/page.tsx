// istanbul ignore file
import { FC } from 'react'
import {
    Breadcrumb,
    Breadcrumbs,
    Container,
    TimeRangeSelector,
} from '@/components'
import { IbcFlowHistoryContainer, IbcTableContainer } from '@/containers'
import { generatePageMetadata } from '@/lib/utils'

export const metadata = generatePageMetadata(
    'IBC Chains',
    'Explore IBC Chains connected to the Penumbra blockchain. View client ' +
        'ID, channel ID, and transaction information on Noctis - a fast, ' +
        'secure, and privacy-focused explorer built for Penumbra blockchain.',
    '/ibc'
)

interface Props {
    searchParams: Promise<{ range?: string }>
}

const IbcPage: FC<Props> = async props => {
    const searchParams = await props.searchParams

    return (
        <Container>
            <Breadcrumbs>
                <Breadcrumb href="/">Explore</Breadcrumb>
                <Breadcrumb>IBC Chains</Breadcrumb>
            </Breadcrumbs>
            <IbcFlowHistoryContainer
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
            <IbcTableContainer className="mt-4" />
        </Container>
    )
}

export default IbcPage
