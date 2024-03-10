import { Text } from "@/components/text"
import { PlusOutlined } from "@ant-design/icons"
import { useDroppable } from "@dnd-kit/core"
import { Badge, Button, Space } from "antd"

const KanbanColumn = () => {
    const { isOver, setNodeRef, active } = useDroppable({
        id: '',
        data: ''
    })

    const count = 2

    const onAddClickHandler = () => {
        
    }

    return (
        <div
            ref={setNodeRef}
            style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '0 16px'
            }}
        >
            <div style={{ padding: '12px' }}>
                <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                    <Space>
                        <Text 
                            ellipsis={{ tooltip: 'TITLE TO DO' }}
                            size="xs"
                            strong
                            style={{
                                textTransform: 'uppercase',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            TITLE TO DO
                        </Text>
                        {!!count && <Badge count={count} color="cyan" />}
                    </Space>
                    <Button 
                        shape="circle"
                        icon={<PlusOutlined/>}
                        onClick={onAddClickHandler}
                    />
                </Space>
            </div>
        </div>
    )
}

export default KanbanColumn