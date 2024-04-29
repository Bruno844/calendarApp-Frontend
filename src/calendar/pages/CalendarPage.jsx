import { Calendar, dateFnsLocalizer, globalizeLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import NavBar from "../components/NavBar"


//FNS
import { addHours } from 'date-fns'
import { localizer } from '../../helpers/calendarLocalizer';
import { getMessagesES } from '../../helpers/getMessages';
import {CalendarEvent} from '../components/CalendarEvent';
import { useState } from 'react';
import CalendarModal from '../components/CalendarModal';
import { useUiStore } from '../../hooks/useUiStore';
import { useCalendarStore } from '../../hooks/useCalendarStore';
import { FabAddNew } from '../components/FabAddNew';
import { FabDelete } from '../components/FabDelete';







export const CalendarPage = () => {

  const {openDateModal} = useUiStore();

  const {events,setActiveEvent} = useCalendarStore()

  const [lastView, setLastView] = useState(localStorage.getItem('lastview') || 'week')

  const eventStyleGetter = (event,start,end, isSelected) => {
    
  }


  const onDoubleClick = (event) => {
    //console.log({doubleClick: event})
    openDateModal();
  }

  const onSelect = (event) => {
    console.log({click: event});
    setActiveEvent(event)
  }

  const onViewChange = (event) => {
    localStorage.setItem('lastview',event);

  }



  return (
    <>
      <NavBar />


      <Calendar
        culture='es'
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChange}
      />


      <CalendarModal />
      <FabAddNew />
      <FabDelete />

    </>
  )
}

