import { useState, useEffect } from "react";

export  const Test = ()  =>{

    const [user, setUser] = useState<string[]>([]);
    const [error, setError] = useState<string|null>(null);

    useEffect(()=>{
        fetch("http://localhost:3001/api/cats")
            .then((res) => res.json())
            .then((data)=> setUser(data.map((user:{email: string}) => user.email)))
            .catch(()=> setError("Error fatch users"));
    }, [])

    return (
        <div>
            <h1>User</h1>
            {error && <p>{error}</p>}
            <ul>
                {user.map((user) =>(
                    <li key={user}>{user}</li>
                ))}
            </ul>
        </div>
    )
};
