import React from "react"
import { useInfiniteQuery } from "react-query"
import { useParams } from "react-router-dom"
import { getLogBookEntries, getPictures } from "../apiCaller"
import ScreenLogo from "../components/loadingScreen/ScreenLogo"
import { useToken } from "../context/userContext"
import LogBookEntry from "./LogBookEntry"
import Picture from "./Picture"
export default function Album() {
    const { id } = useParams()
    const [token] = useToken()
    const { data: dataLogBook, error: errorLogBook,
        hasNextPage: hasNextPageLogBook, isFetching: isFetchingLogBook,
        isFetchingNextPage: isFetchingNextPageLogBook, status: statusLogBook }
        = useInfiniteQuery(['album', id], () => getLogBookEntries(token, id), {
            getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
        })

    const { data: dataPictures, error: errorPictures,
        hasNextPage: hasNextPagePictures, isFetching: isFetchingPictures,
        isFetchingNextPage: isFetchingNextPagePictures, status: statusPictures }
        = useInfiniteQuery(['pictures', id], () => getPictures(token, id), {
            // getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
        })
    console.log(dataPictures)
    return statusLogBook === "loading" ? (<ScreenLogo />)
        : statusLogBook === "error" ? (<p>Error</p>) :
            (<>
                <div style={{ display: "flex", flexDirection: "row", }}>
                    <div style={{ width: "30vw" }}>
                        {dataLogBook.pages.map((page) =>
                            page.map((entry) =>
                                <LogBookEntry date={entry.creationDate} text={entry.content} />
                            )

                        )}
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", flexWrap: "wrap", width: "70vw" }}>
                        {dataPictures.pages.map((page) =>
                            page.map((image) =>
                                <Picture id={image.id} />
                            ))}
                    </div>

                    {/*                     {dataLogBook.pages.map((group, i) => (
                        <React.Fragment key={i}>
                            {group.projects.map(project => (
                                <p key={project.id}>(project.conent)</p>
                            ))}
                        </React.Fragment>
                    ))} */}
                    {/*                        <div>
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
                */} </div>
            </>)
}