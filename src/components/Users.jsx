import React from 'react';
import { Skeleton } from './Skeleton';
import { User } from './User';
import { useEffect, useState } from 'react';
import { Success } from './Success';

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [invites, setInvites] = useState([]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch('https://reqres.in/api/users')
      .then(res => res.json())
      .then(json => {
        setUsers(json.data)
      }).catch(err => {
        console.warn(err);
        alert('Помилка при отриманні користувачів')
      })
      .finally(() => setLoading(false))
  }, [])

  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value)
  }

  const onClickInvite = (id) => {
    if (invites.includes(id)) {
      setInvites(prev => prev.filter(_id => _id !== id))
    } else {
      setInvites(prev => [...prev, id])
    }
  }

  const onclickSendInvites = () => {
    setSuccess(true)
  }

  return (
    <div className='users'>
      {
        success ? (<Success count={invites.length} />) :
          (<div className='users__block'>
            <div className="search">
              <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
              </svg>
              <input value={searchValue} onChange={onChangeSearchValue} type="text" placeholder="Знайти користувача..." />
            </div>
            {isLoading ? (
              <div className="skeleton-list">
                <Skeleton />
                <Skeleton />
                <Skeleton />
              </div>
            ) : (
              <ul className="users-list">
                {users
                  .filter((obj) => {
                    const fullName = (obj.first_name + obj.last_name).toLowerCase()
                    return fullName.includes(searchValue.toLowerCase())
                  })
                  .map((obj) => <User isInvited={invites.includes(obj.id)} onClickInvite={onClickInvite} key={obj.id} {...obj} />)
                }
              </ul>
            )}
            {
              invites.length > 0 && (
                <button onClick={onclickSendInvites} className="send-invite-btn">Відправити запрошення</button>
              )
            }
          </div>)
      }

    </div>
  );
};
