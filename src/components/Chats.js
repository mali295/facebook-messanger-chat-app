import Reac, {useRef, useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import { ChatEngine } from 'react-chat-engine'
import { auth } from '../firebase'

import { useAuth } from '../contexts/AuthContext'
import axios from 'axios'


const Chats = () => {
    const history = useHistory()
    const { user } = useAuth()
    const [loading, setLoading] = useState(true)

    console.log(user)

    const handleLogout = async () => {
        await auth.signOut()

        history.push('/')
        
    }

    const getFile = async (url) => {
        const response = await fetch(url)
        const data = await response.blobl()

        return new File([data], "userPhoto.jpg", {type: "image/jpeg" })
    }

    useEffect(() => {
        if (!user) {
            history. push('/')

            return
        }
        axios.get('https://api/chatengine.io/users/me', {
            headers: {
                "project-id": "6569d195-2778-4945-9992-b96447b15b42",
                "user-name": user.email,
                "user-secret": user.uid,
            }
        })
        .then(() => {
            setLoading(false)
        })
        .catch(() => {
            let formdata = new FormData();
            formdata.append('email', user.email)
            formdata.append("username", user.displayName)
            formdata.append("secret", user.uid)

            getFile(user.photoUrl)
               .then((avatar) => {
                   formdata.append('avatar', avatar, avatar.name)
               })
        })
    }, [user, history])

    return (
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">
                    Unichat
                </div>
                <div onClick={handleLogout} className="logout-tab">
                    Logout
                </div>
            </div>

            <ChatEngine
                height="calc(100vh - 66px)"
                projectId="6569d195-2778-4945-9992-b96447b15b42"
                userName="."
                userSecret="."
            />
        </div>
    )
}