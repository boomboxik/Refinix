import { Text } from "@/components/text"
import { User } from "@/graphql/schema.types"
import { EyeOutlined } from "@ant-design/icons"
import { Button, Card, ConfigProvider, Dropdown, MenuProps, theme } from "antd"
import { useMemo } from "react"

type ProjectCardPorps = {
    id: string
    title: string
    updatedAt: string
    dueDate?: string
    users?: {
        id: string
        name: string
        avatar?: User['avatarUrl']
    }[]
}

const ProjectCard = ({ id, title, dueDate, users }: ProjectCardPorps) => {
    const { token } = theme.useToken()

    const edit = () => {}

    const dropdownItems = useMemo(() => {
        const dropdownItems: MenuProps['items'] = [
            {
                label: 'View card',
                key: '1',
                icon: <EyeOutlined/>,
                onClick: () => {
                    edit()
                }
            }
            {
                danger: true,
                label: 'Delete card',
                key: '2',
                onClick: () => {}
            }
        ]

        return dropdownItems
    }, [])

    return (
        <ConfigProvider
            theme={{
                components: {
                    Tag:{
                        colorText: token.colorTextSecondary
                    },
                    Card: {
                        headerBg: 'transparent'
                    }
                }
            }}
        >
            <Card
                size="small"
                title={<Text ellipsis={{tooltip: title}}>{title}</Text>}
                onClick={() => edit()}
                extra={
                    <Dropdown
                        trigger={["click"]}
                        menu={{
                            items: dropdownItems
                        }}
                    >
                        <Button>
                            
                        </Button>
                    </Dropdown>
                }
            >

            </Card>
        </ConfigProvider>
    )
}

export default ProjectCard