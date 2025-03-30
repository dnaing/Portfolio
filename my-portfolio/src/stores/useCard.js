import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

export default create(subscribeWithSelector((set) => 
{
    return {

        activeCard: null,

        setActiveCard: (cardName) =>
        {
            set(() => 
            {
                return { activeCard: cardName } 
            })
        },

        setActiveCardNull: () =>
        {
            set(() => 
            {
                return { activeCard: null } 
            })
        },

        cameraPosition: [ 0, 0, 5 ],

        setCameraPosition: () =>
        {
            set((newPosition) =>
            {
                return { cameraPosition: newPosition }
            })
        }
    }
}))