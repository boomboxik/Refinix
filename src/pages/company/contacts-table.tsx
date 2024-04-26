import { useParams } from "react-router-dom";

import { FilterDropdown, useTable } from "@refinedev/antd";
import { GetFieldsFromList } from "@refinedev/nestjs-query";

import {
    MailOutlined,
    PhoneOutlined,
    SearchOutlined,
    TeamOutlined,
} from "@ant-design/icons";
import { Button, Card, Input, Select, Space, Table } from "antd";

import { Contact } from "@/graphql/schema.types";

import { statusOptions } from "@/constants";
import { COMPANY_CONTACTS_TABLE_QUERY } from "@/graphql/queries";

import { CompanyContactsTableQuery } from "@/graphql/types";
import { Text } from "@/components/text";
import CustomAvatar from "@/components/custom-avatar";
import { ContactStatusTag } from "@/components/tags/contact-status-tag";

export const CompanyContactsTable = () => {

const params = useParams();
const { tableProps } = useTable<GetFieldsFromList<CompanyContactsTableQuery>>(
    {
        resource: "contacts",
        syncWithLocation: false,
        sorters: {
            initial: [
            {
                field: "createdAt",
                order: "desc",
            }
            ]
        },
    filters: {
        initial: [
            {
                field: "jobTitle",
                value: "",
                operator: "contains",
            },
            {
                field: "name",
                value: "",
                operator: "contains",
            },
            {
                field: "status",
                value: undefined,
                operator: "in",
            },
        ],
        permanent: [
            {
                field: "company.id",
                operator: "eq",
                value: params?.id as string,
            },
        ],
    },
        meta: {
        gqlQuery: COMPANY_CONTACTS_TABLE_QUERY,
        },
    },
);

    return (
        <Card
            headStyle={{
            borderBottom: "1px solid #D9D9D9",
            marginBottom: "1px",
            }}
            bodyStyle={{ padding: 0 }}
            title={
                <Space size="middle">
                <TeamOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
                <Text>Contacts</Text>
                </Space>
            }
            extra={
                <>
                <Text className="tertiary">Total contacts: </Text>
                <Text strong>
                    {/* if pagination is not disabled and total is provided then show the total */}
                    {tableProps?.pagination !== false && tableProps.pagination?.total}
                </Text>
                </>
            }
        >
            <Table
                {...tableProps}
                rowKey="id"
                pagination={{
                ...tableProps.pagination,
                showSizeChanger: false, // hide the page size changer
                }}
            >
                <Table.Column<Contact>
                title="Name"
                dataIndex="name"
                render={(_, record) => (
                    <Space>
                    <CustomAvatar name={record.name} src={record.avatarUrl} />
                    <Text
                        style={{
                        whiteSpace: "nowrap",
                        }}
                    >
                        {record.name}
                    </Text>
                    </Space>
                )}
                filterIcon={<SearchOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />}
                filterDropdown={(props) => (
                    <FilterDropdown {...props}>
                        <Input placeholder="Search Name" />
                    </FilterDropdown>
                )}
                />
            <Table.Column
                title="Title"
                dataIndex="jobTitle"
                filterIcon={<SearchOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />}
                filterDropdown={(props) => (
                    <FilterDropdown {...props}>
                        <Input placeholder="Search Title" />
                    </FilterDropdown>
                )}
            />
            <Table.Column<Contact>
                title="Stage"
                dataIndex="status"
                render={(_, record) => <ContactStatusTag status={record.status} />}
                filterDropdown={(props) => (
                    <FilterDropdown {...props}>
                        <Select
                            style={{ width: "200px" }}
                            mode="multiple" // allow multiple selection
                            placeholder="Select Stage"
                            options={statusOptions}
                        ></Select>
                    </FilterDropdown>
                )}
            />
            <Table.Column<Contact>
                dataIndex="id"
                width={112}
                render={(_, record) => (
                    <Space>
                        <Button
                            size="small"
                            href={`mailto:${record.email}`}
                            icon={<MailOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />}
                        />
                        <Button
                            size="small"
                            href={`tel:${record.phone}`}
                            icon={<PhoneOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />}
                        />
                    </Space>
                )}
            />
            </Table>
        </Card>
    );
};