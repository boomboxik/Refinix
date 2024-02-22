import { COMPANIES_LIST_QUERY } from "@/graphql/queries"
import { CreateButton, List, useTable } from "@refinedev/antd"
import { useGo } from "@refinedev/core"
import { Table } from "antd"

export const CompanyList = () => {
    const go = useGo()
    const { tableProps, filters } = useTable({
        resource: 'companies',
        meta: {
            gqlQuery: COMPANIES_LIST_QUERY
        }
    })

    return (
        <List
            breadcrumb={false}
            headerButtons={() => (
                <CreateButton
                    onClick={() => {
                        go({
                            to: {
                                resource: 'companies',
                                action: 'create'
                            },
                            options: {
                                keepQuery: true
                            },
                            type: 'replace'
                        })
                    }}
                />
            )}
        >
            <Table>

            </Table>
        </List>
    )
}