import React from "react"
import { useInfiniteQuery } from "react-query"

export default function Album() {
    const { data, error, hasNextPage, isFetching, isFetchingNextPage, status } = useInfiniteQuery('album', () => { }, {
        getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
    })
    return status === "loading" ? (<p>loading</p>)
        : status === "error" ? (<p>Error</p>) :
            (<>
                {data.pages.map((group, i) => (
                    <React.Fragment key={i}>
                        {group.projects.map(project => (
                            <p key={project.id}>(project.name)</p>
                        ))}
                    </React.Fragment>
                ))}
                <div>
                    <button onClick={() => fetchNextPage()}
                        disabled={!hasNextPage || isFetchingNextPage}>
                        {isFetchingNextPage
                            ? 'Loading more...'
                            : hasNextPage
                                ? 'Load More'
                                : 'Nothing more to load'}
                    </button>
                </div>
                <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
            </>)
}