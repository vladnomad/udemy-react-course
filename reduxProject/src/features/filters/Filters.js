import { useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { filtersChangeActive } from "./filtersSlice"
import { useGetFiltersQuery } from "../../api/apiSlice" 
import classNames from "classnames"

const Filters = () => {
    const { data: filters = [] } = useGetFiltersQuery()
    const filterContainerRef = useRef(null)
    const activeFilter = useSelector(state => state.filters.activeFilter)
    const dispatch = useDispatch()

    const renderFilterBtns = (filters) => {
        if (filters.length === 0) {
            return <h5 className="text-center mt-5">No filters found</h5>
        }

        return filters.map(({ filter, className }) => {
            const btnClass = classNames("btn", className, {
                "active": filter === activeFilter
            })

            return <button 
                key={filter}
                className={btnClass} 
                onClick={() => dispatch(filtersChangeActive(filter))}>
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
        })
    }

    const filterBtns = renderFilterBtns(filters)

    return (
        <div className="card shadow-lg mt-4 rounded-3 bg-card">
            <div className="card-body rounded-3 bg-glass">
                <p className="card-text fs-4">Filter deities by their element</p>
                <div className="btn-group bg-glass" ref={filterContainerRef}>
                    {filterBtns}
                </div>
            </div>
        </div>
    )
}

export default Filters