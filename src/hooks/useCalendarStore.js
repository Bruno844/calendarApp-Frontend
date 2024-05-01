import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice"
import {calendarApi} from '../api';
import {convertDatesToNumbers} from '../helpers/convertDatesToNumbers'
import Swal from "sweetalert2";


export const useCalendarStore = () => {
  
    const dispatch = useDispatch()
    const {events,activeEvent} = useSelector(state => state.calendar)
    const {user} = useSelector(state => state.auth)
  
    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent))
    }

    const startSavingEvent = async(calendarEvent) => {
        
       
        try {

            if(calendarEvent.id){
                //*significa que estoy actualizando
                await calendarApi.put(`/events/update-event/${calendarEvent.id}`, calendarEvent)
                dispatch(onUpdateEvent({...calendarEvent,user}));
                return;
            } 
    
            //* si no viene id,estoy creando una nueva evento(nota)
    
            //*llegar al backend
            const {data} = await calendarApi.post('/events/new-event', calendarEvent);
    
            dispatch(onAddNewEvent({...calendarEvent, id: data.eventSave.id,user }))
            Swal.fire('creado con exito', 'se registro correctamente', 'success')
            
        } catch (error) {
            console.log(error, 'error en la hora de crear o actualizar');
            Swal.fire('Error al guardar o actualizar',error.response.data.msg, 'error')
        }


        
       
    }


    //*funcion para eliminar un evento
    const startDeletingEvent = async() => {

        try {
            if(activeEvent.id){
                await calendarApi.delete(`/events/delete-event/${activeEvent.id}`)
                dispatch(onDeleteEvent())
                Swal.fire('Eliminado con exito', 'se registro bien', 'success')
                return;
            }else {
                return setActiveEvent(activeEvent)
            }
            
            
        } catch (error) {
            console.log(error, 'error a la hora de eliminar');
            Swal.fire('Error al guardar o actualizar',error.response.data?.msg, 'error')
        }
    }



    const startLoadingEvents = async() => {

        try {

            const {data} = await calendarApi.get('/events');
            const events = convertDatesToNumbers(data.events)
            dispatch(onLoadEvents(events))
            console.log(data)
            
        } catch (error) {
            console.log('error cargando eventos')
        }


    }
 

  
    return {
        //*propiedades
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

       //*metodos
       setActiveEvent,
       startSavingEvent,
       startDeletingEvent,
       startLoadingEvents,

    }
}

