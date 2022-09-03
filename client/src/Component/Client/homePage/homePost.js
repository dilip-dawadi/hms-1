import React from 'react'
import AdminPage from '../../Admin/homePageAdmin/Admin'
import Slider from './homeSilder/silde'
const ClientHomePost = () => {
    const user = JSON.parse(localStorage.getItem('profile'))
    if (user?.result?.role) {
        return (
            <AdminPage />
        )
    }
    return (
        <Slider />
    )
}

export default ClientHomePost