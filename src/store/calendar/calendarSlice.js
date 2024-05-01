import { createSlice} from '@reduxjs/toolkit';




export const calendarSlice = createSlice({

    name: 'calendar',
    initialState: {
        isLoadingEvents: true,
        events: [
            
        ],
        activeEvent: null
    },
    reducers: {
        onSetActiveEvent: (state,{payload}) => {
            //cuando apretamos una nota, se activa la misma y muestra los valores de esa nota
            state.activeEvent = payload
        },
        onAddNewEvent: (state, {payload}) => {
            state.events.push(payload);
            state.activeEvent = null;
        },
        onUpdateEvent: (state, {payload}) => {
            state.events = state.events.map(event => {
                
                if(event.id === payload.id){
                    return payload;
                }

                return event;
            });
            
        },
        onDeleteEvent: (state) => {
            if(state.activeEvent){
                state.events = state.events.filter(event => event.id !== state.activeEvent.id);
                state.activeEvent = null
            }
            
            
            
        },
        onLoadEvents: (state,{payload = []}) => {
            state.isLoadingEvents = false;
            //state.events = payload
            //*recorremos el payload del arreglo de eventos que tengamos en la base de datos
            payload.forEach(event => {
                //*aca iteramos el evento del payload, y si existe un evento de la db que coincidan sus id, no hago nada
                //* y si no, lo pusheo al arreglo de eventos ese evento que itero del payload
                //*el.some devuelve true si al menos un elemento del arreglo coincide con la condicion que le estemos pasando
                //*y si no, devuelve un false 
                const exists = state.events.some(dbEvent => dbEvent.id === event.id);
                if(!exists){
                    state.events.push(event)
                }
            })
        },
        onLogOutCalendar: (state) => {
            state.isLoadingEvents = true;
            state.events = [];
            state.activeEvent = null;
        }
         
    }

});



export const { onSetActiveEvent,onAddNewEvent,onUpdateEvent,onDeleteEvent,onLoadEvents, onLogOutCalendar } = calendarSlice.actions;