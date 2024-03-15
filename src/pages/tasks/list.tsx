import { KanbanBoardContainer, KanbanBoard } from "@/components/tasks/kanban/board"
import KanbanColumn from "@/components/tasks/kanban/column"
import KanbanItem from "@/components/tasks/kanban/item"
import { TASKS_QUERY, TASK_STAGES_QUERY } from "@/graphql/queries"
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

    return (
        <>
            <KanbanBoardContainer>
                <KanbanBoard>
                    <KanbanColumn>
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