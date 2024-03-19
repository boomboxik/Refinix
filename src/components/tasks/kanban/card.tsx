import { User } from "@/graphql/schema.types"

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
    return (
        <div>ProjectCard</div>
    )
}

export default ProjectCard