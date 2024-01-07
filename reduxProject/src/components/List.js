import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createSelector } from "reselect"
import { useHttp } from "../hooks/http.hook"
import { deleteDeity, error } from "../store/actions"
import ListItem from "./ListItem"
import Spinner from "./Spinner"

const List = () => {
    const filteredDeitiesSelector = createSelector(
        state => state.activeFilter,
        state => state.deities,
        (activeFilter, deities) => {
            if (activeFilter === "all") {
                return deities
            } else {
                return deities.filter(item => item.element === activeFilter)
            }
        }
    )
    const filteredDeities = useSelector(filteredDeitiesSelector)
    const status = useSelector(state => state.status)
    const dispatch = useDispatch()
    const { request } = useHttp()

    const handleDelete = useCallback((deityID) => {
        request(`http://localhost:3001/deities/${deityID}`, "DELETE")
        .then(dispatch(deleteDeity(deityID)))
        .catch(err => { 
            dispatch(error())
            console.error("Error deleting item", err)
        })
    }, [request, dispatch])
    
    if (status === "loading") {
        return <Spinner/>
    } else if (status === "error") {
        return <h5 className="text-center mt-5">Error occured while loading</h5>
    }

    const renderList = (arr, handleDelete) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">There are no entries yet</h5>
        }

        let arrReversed = []
        for (let i = 0; i < arr.length; i++) arrReversed.unshift(arr[i])

        return arrReversed.map(({id, ...props}) => {
            return <ListItem key={id} id={id} handleDelete={handleDelete} {...props}/>
        })
    }

    const elements = renderList(filteredDeities, handleDelete)

    return (
        <ul>
            {elements}
        </ul>
    )
}

export default List