import { useState } from "react"

import { DeleteButton, useModalForm } from "@refinedev/antd"
import { useNavigation } from "@refinedev/core"

import {
    AlignLeftOutlined,
    FieldTimeOutlined,
    UsergroupAddOutlined,
} from "@ant-design/icons"

import { Modal } from "antd"

import {
    Accordion,
    DescriptionForm,
    DescriptionHeader,
    DueDateForm,
    DueDateHeader,
    StageForm,
    TitleForm,
    UsersForm,
    UsersHeader,
} from "@/components"

import { Task } from "@/graphql/schema.types"

import { UPDATE_TASK_MUTATION } from "@/graphql/mutations"

const TasksEditPage = () => {
    const [activeKey, setActiveKey] = useState<string | undefined>()

    const { list } = useNavigation()

    const { modalProps, close, queryResult } = useModalForm<Task>({
        action: "edit",
        defaultVisible: true,
        meta: {
            gqlMutation: UPDATE_TASK_MUTATION
        }
    })

    const { description, dueDate, users, title } = queryResult?.data?.data ?? {}

    const isLoading = queryResult?.isLoading ?? true

    return (
        <Modal
            {...modalProps}
            className="kanban-update-modal"
            onCancel={() => {
                close();
                list("tasks", "replace")
            }}
            title={<TitleForm initialValues={{ title }} isLoading={isLoading} />}
            width={586}
            footer={
                <DeleteButton
                    type="link"
                    onSuccess={() => {
                    list("tasks", "replace")
                }}
                >
                Delete card
                </DeleteButton>
            }
        >
        <StageForm isLoading={isLoading} />

        <Accordion
            accordionKey="description"
            activeKey={activeKey}
            setActive={setActiveKey}
            fallback={<DescriptionHeader description={description} />}
            isLoading={isLoading}
            icon={<AlignLeftOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />}
            label="Description"
        >
            <DescriptionForm
                initialValues={{ description }}
                cancelForm={() => setActiveKey(undefined)}
            />
        </Accordion>

        <Accordion
            accordionKey="due-date"
            activeKey={activeKey}
            setActive={setActiveKey}
            fallback={<DueDateHeader dueData={dueDate} />}
            isLoading={isLoading}
            icon={<FieldTimeOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />}
            label="Due date"
        >
            <DueDateForm
                initialValues={{ dueDate: dueDate ?? undefined }}
                cancelForm={() => setActiveKey(undefined)}
            />
        </Accordion>

        <Accordion
            accordionKey="users"
            activeKey={activeKey}
            setActive={setActiveKey}
            fallback={<UsersHeader users={users} />}
            isLoading={isLoading}
            icon={<UsergroupAddOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />}
            label="Users"
        >
            <UsersForm
                initialValues={{
                    userIds: users?.map((user) => ({
                        label: user.name,
                        value: user.id,
                    })),
                }}
                cancelForm={() => setActiveKey(undefined)}
            />
        </Accordion>
    </Modal>
    )
}

export default TasksEditPage