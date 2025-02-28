'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { createNewUserAction, findUserAction } from '../../actions/UserAction';
import { v4 as uuidv4 } from 'uuid';



export default function AddUserComponent() {

    const [userName, setUserName] = useState('');

    async function createUser() {
        const userId = uuidv4();
        await createNewUserAction(userId);
    }

    async function findUser() {
        const user = await findUserAction("e78a24e3-e15c-4231-b11e-8878d5e7c4b4");
        console.log('user', user)
    }



    return (
        <div className='flex items-center gap-2 p-2 justify-end'>
            <Input placeholder='User Name' type='text' value={userName} onChange={(e) => setUserName(e.target.value)} />
            <Button onClick={createUser}>Add New User</Button>
            <Button onClick={findUser}>Find User</Button>
        </div>
    )
}
