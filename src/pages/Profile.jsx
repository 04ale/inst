import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { User } from 'lucide-react'
import { db } from '../services/FirebaseConfig'
import { collection } from 'firebase/firestore'
import { useParams } from 'react-router-dom'
import { useAuth } from '../Authentication'

function Profile() {
    const [user, setUser] = useState(null)
    const [loading,setLoading] = useState(true)
    const {userId} = useParams()
    const { currentUser } = useAuth();

    useEffect(()=>{
        const fetchUserProfile = async () => {
            try{
                const userCollectionRef = collection(db, 'users', userId);
                const docSnap = await getDocs(userCollectionRef);

                if (docSnap.exists()) {
                    setUser(docSnap.data())
                } else {
                    console.log('Perfil não encontrado')
                    setUser('null')
                }
            } catch (erro) {
                console.error("Erro ao buscar Users: ", erro);
            } finally {
                setLoading(false)
            }
        }
    }, [])

  return (
    <div>
        <Navbar />
        <div className='pt-23 px-8'>
            <User size={80} className='rounded-full bg-gray-800 text-white'/>
        </div>
    </div>
  )
}

export default Profile