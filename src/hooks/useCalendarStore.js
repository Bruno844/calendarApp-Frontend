import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice"



export const useCalendarStore = () => {
  
    const dispatch = useDispatch()
    const {events,activeEvent} = useSelector(state => state.calendar)
  
    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent))
    }

    const startSavingEvent = async(calendarEvent) => {
        
        if(calendarEvent._id){
            //*significa que estoy actualizando
            dispatch(onUpdateEvent({...calendarEvent}))
        } else {
            //* si no viene id,estoy creando una nueva evento(nota)
            dispatch(onAddNewEvent({...calendarEvent, _id: new Date().getTime()}))
        }
    }

    const startDeletingEvent = () => {
        dispatch(onDeleteEvent())
    }


  
    return {
        //*propiedades
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

       //*metodos
       setActiveEvent,
       startSavingEvent,
       startDeletingEvent
    }
}

