

import { createSlice} from '@reduxjs/toolkit';

export const uiSlice = createSlice({

    name: 'ui',
    initialState: {
        //si el modal esta abierto o no
        isDateModalOpen: false
    },
    reducers: {
       onOpenDateModal: (state) => {
        state.isDateModalOpen = true
       },
       onCloseDateModal: (state) => {
        state.isDateModalOpen = false
       }
    }

});



export const { onOpenDateModal, onCloseDateModal } = uiSlice.actions;