import NoSsr3 from "@/__CORE__/components/NoSsr3";

export function noSSRWrapper<T extends React.ComponentType<any>>(Cpt: T): T {
    // return dynamic(() => import('./client'), { ssr: false, loading: () => <PageLoadingEffect /> })
    return (
        props => <NoSsr3>
            <Cpt {...props} />
        </NoSsr3>
    ) as T
}