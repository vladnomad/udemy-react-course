import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { error, fetching, fetchedDeities, fetchedFilters } from "../store/actions"
import { useHttp } from "../hooks/http.hook"

import List from "./List"
import AddForm from "./AddForm"
import Filters from "./Filters"
import "../styles/app.scss"

const App = () => {
    const dispatch = useDispatch()
    const { request } = useHttp()

    useEffect(() => {
        dispatch(fetching())
        request("http://localhost:3001/filters")
            .then(data => {
                console.log(data)
                dispatch(fetchedFilters(data))
             })
            .catch(() => dispatch(error()) )
        
        dispatch(fetching())
        request("http://localhost:3001/deities")
            .then(data => {
                console.log(data)
                dispatch(fetchedDeities(data))
             })
            .catch(() => dispatch(error()) )
    }, [request, dispatch])

    return (
        <main className="app">
            <div className="content">
                <List/>
                <div className="content__interactive">
                    <AddForm/>
                    <Filters/>
                </div>
            </div>
        </main>
    )
}

export default App