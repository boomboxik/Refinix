import { ThemedLayoutV2, ThemedTitleV2 } from "@refinedev/antd"

import { Header } from "./header"

export const Layout = ({ children }: React.PropsWithChildren) => {  
    return (
        <>
            <ThemedLayoutV2
                Header={Header}
                Title={(titleProps) => {
                    return <ThemedTitleV2 {...titleProps} text="Refinix" />
                }}
            >
                {children}
            </ThemedLayoutV2>
        </>
    )
}