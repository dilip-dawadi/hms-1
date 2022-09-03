import React from 'react'
import FoodAdminPage from '../../Admin/foodPageAdmin/foodAdmin'
import FoodClientPage from './clientFood/clientFood'
const ClientHomePost = () => {
    const user = JSON.parse(localStorage.getItem('profile'))
    if (user?.result?.role) {
        return (
            <FoodAdminPage />
        )
    }
    return (
        <FoodClientPage />
    )
}

export default ClientHomePost