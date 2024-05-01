import { useCalendarStore } from "../../hooks/useCalendarStore";
import { useUiStore } from "../../hooks/useUiStore"



export const FabDelete = () => {

    const { openDateModal } = useUiStore();
    const {startDeletingEvent,hasEventSelected,activeEvent  } = useCalendarStore()

    const handleDelete = () => {
        startDeletingEvent();
        
    }


    return (
        <button
            className="btn btn-danger fab-danger"
            onClick={handleDelete}
            style={{
                display: hasEventSelected ? '': 'none'
            }}
        >
            <i className="fas fa-trash-alt"></i>
        </button>
    )
}

