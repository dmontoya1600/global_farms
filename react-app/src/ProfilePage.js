
import React, {useContext, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { AppContext } from './AppContext';
import { updateUser } from './store/session';


const ProfilePage = () => {
  const user = useSelector(state => state.session.user)
  let [username, setUserName] = useState(user.username)
  let [email, setEmail] = useState(user.email)
  const {setActiveProfile} = useContext(AppContext)
  let [deleteIsActive, setDeleteIsActive] = useState(false)
  const dispatch = useDispatch()
  const history = useHistory()


    async function handleSubmit() {
        let form = {
            username,
            email,
            id: user.id,
        }
        let res = await dispatch(updateUser(form, user))
        setActiveProfile(false)
    }

    async function handleDelete() {
        history.push('/')
        // await dispatch(deleteFarm(farm.id, user.id))
    }

    function handleClose() {
        setActiveProfile(false)
    }
    function confirmDelete(){
        return (
                <div className='confirm__delete__form'>
                    <div>Are you sure you wish to delete?</div>
                    <button className='delete__option' onClick={() => handleDelete()}>
                        Yes
                    </button>
                    <button className='delete__option' onClick={() => setDeleteIsActive(false)}>
                        No
                    </button>
                </div>
        )
    }

  return (
    <div className='background__shadow'>


        <div className='edit__farm__page'>
                <div className='exit' onClick={handleClose}>X</div>
                <label>Username
                    <input type='text' value={username} onChange={(e) => {setUserName(e.target.value)}} />
                </label>
                <label>Email
                    <input type='text' value={email} onChange={(e) => {setEmail(e.target.value)}} />
                </label>

                {deleteIsActive ? confirmDelete(): null}
                {!deleteIsActive ? <button className='submit' onClick={handleSubmit}>Update</button>: null}
                {!deleteIsActive ? <button className='delete' onClick={() => setDeleteIsActive(true)}>Delete User</button>: null}

        </div>
    </div>
  );
}

export default ProfilePage;
