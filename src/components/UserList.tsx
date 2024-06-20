import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setLoading, setUsers } from '../store/userSlice';
import axios from 'axios';
import { User } from '../types';
import AlbumList from './AlbumList';
import Loading from "./Loading.tsx";
import styles from "./styles.module.css"

const UserList: React.FC = () => {
    const dispatch = useDispatch();
    const users = useSelector((state: RootState) => state.users.users);
    const loading = useSelector((state: RootState) => state.users.loading);
    const [expandedUserId, setExpandedUserId] = useState<number | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            dispatch(setLoading(true));
            try {
                const response = await axios.get<User[]>('http://localhost:3000/users');
                dispatch(setUsers(response.data));
            } catch (error) {
                console.error(error);
            } finally {
                dispatch(setLoading(false));
            }
        };

        fetchUsers();
    }, [dispatch]);

    const handleUserClick = (userId: number) => {
        setExpandedUserId(expandedUserId === userId ? null : userId);
    };

    return (
        <div>
            {loading ? (
                <Loading />
            ) : (
                <ul>
                    {users.map((user) => (
                        <li key={user.id} className={styles.user}>
                            <div onClick={() => handleUserClick(user.id)}>
                                {user.name}
                            </div>
                            <ul className={`${styles.albums} ${expandedUserId === user.id ? styles.active : ''}`}>
                                <AlbumList userId={user.id}/>
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UserList;
