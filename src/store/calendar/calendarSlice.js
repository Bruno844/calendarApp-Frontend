import { createSlice} from '@reduxjs/toolkit';
import { addHours } from 'date-fns';


const tempEvent = {
    _id:new Date().getTime() ,
    title: 'cumpleaños del boss',
    notes: 'hay que comprar pastel',
    start: new Date(),
    end: addHours(new Date(), 1),
    bgColor: '#fafafa',
    user: {
      id: '123',
      name: 'bruno ruiz'
    }
}

export const calendarSlice = createSlice({

    name: 'calendar',
    initialState: {
        events: [
            tempEvent
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
                
                if(event._id === payload._id){
                    return payload;
                }

                return event;
            });
        },
        onDeleteEvent: (state) => {
            if(state.activeEvent){
                state.events = state.events.filter(event => event._id !== state.activeEvent._id);
                state.activeEvent = null
            }
            
        }
         
    }

});



export const { onSetActiveEvent,onAddNewEvent,onUpdateEvent,onDeleteEvent } = calendarSlice.actions;