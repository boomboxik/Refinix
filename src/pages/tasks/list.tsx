import { KanbanBoardContainer, KanbanBoard } from "@/components/tasks/kanban/board"
import KanbanColumn from "@/components/tasks/kanban/column"
import KanbanItem from "@/components/tasks/kanban/item"
import { TASKS_QUERY, TASK_STAGES_QUERY } from "@/graphql/queries"
import { TaskStage } from "@/graphql/schema.types"
import { useList } from "@refinedev/core"

const List = () => {
    const { data: stages, isLoading: isLoadingStages } = useList ({
        resource: 'taskStages',
        filters: [
            {
                field: 'title',
                operator: 'in',
                value: ['TO DO', 'IN PROGRESS', 'IN REVIEW', 'DONE']
            }
        ],
        sorters: [
            {
                field: 'createdAt',
                order: 'asc'
            }
        ],
        meta: {
            gqlQuery: TASK_STAGES_QUERY
        }
    })
    const { data: tasks, isLoading: isLoadingTasks } = useList({
        resource: 'tasks',
        sorters: [
            {
                field: 'dueDate',
                order: 'asc'
            }
        ],
        queryOptions: {
            enabled: !!stages
        },
        pagination: {
            mode: 'off'
        },
        meta: {
            gqlQuery: TASKS_QUERY
        }
    })

    const taskStages = React.useMemo(() => {
        if (!tasks?.data || !stages?.data) {
            return {
                unnasignedStage: [],
                stages: []
            }
        }

        const unnasignedStage = tasks.data.filter((task) => task.stageId === null)

        const grouped: TaskStage[] = stages.data.map((stage) => ({
            ...stage,
            tasks: tasks.data.filter((task) => task?.stageId.toString() === stage.id)
        }))

        return {
            unnasignedStage,
            columns: grouped
        }
    }, [stages, tasks])

    const handleAddCard = (args: { stageId: string }) => {

    }

    return (
        <>
            <KanbanBoardContainer>
                <KanbanBoard>
                    <KanbanColumn
                        id="unnasigned"
                        title={"unnasigned"}
                        count={taskStages.unnasignedStage.length || 0}
                        onAddClick={() => handleAddCard({ stageId: 'unnasigned' })}
                    >
                        <KanbanItem>
                            This is to do
                        </KanbanItem>
                    </KanbanColumn>
                    <KanbanColumn>

                    </KanbanColumn>
                </KanbanBoard>
            </KanbanBoardContainer>
        </>
    )
}

export default List