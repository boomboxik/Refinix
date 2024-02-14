import { totalCountVariants } from "@/constants"
import { Card, Skeleton } from "antd"
import { Text } from "../text"

type Props = {
    resource: "companies" | "contacts" | "deals",
    isLoading: boolean,
    totalCount: number
}

const DashboardTotalCountCard = ({
    resource,
    isLoading,
    totalCount
}: Props) => {
    const { primaryColor, secondaryColor, icon, title } = totalCountVariants[resource]

    return (
        <Card
            style={{ height: "96px", padding: 0 }}
            bodyStyle={{ padding: '8px 8px 8px 12px' }}
            size='small'
        >   
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    whiteSpace: 'nowrap'
                }}
            >
                {icon}
                <Text size="md" className="secondary" style={{marginLeft: '8px'}}>
                    {title}
                </Text>
            </div>
            <div
                style={{ display: 'flex', justifyContent: 'space-between' }}
            >
                <Text>
                    {isLoading ? (
                        <Skeleton.Button />
                    ) : (
                        totalCount
                    )}
                </Text>
            </div>
        </Card>
    )
}

export default DashboardTotalCountCard