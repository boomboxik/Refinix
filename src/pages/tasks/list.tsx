import { KanbanBoardContainer, KanbanBoard } from "@/components/tasks/kanban/board"
import KanbanColumn from "@/components/tasks/kanban/column"
import KanbanItem from "@/components/tasks/kanban/item"
import { TASKS_QUERY } from "@/graphql/queries"
import { useList } from "@refinedev/core"

const List = () => {
    const { data: tasks, isLoading: isLoadingTasks } = useList({
        resource: 'tasks',
        sorters: [
            {
                field: 'dueDate',
                order: 'asc'
            }
        ],
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