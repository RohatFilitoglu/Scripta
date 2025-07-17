import { useAuth } from "../context/useAuth";

const Profile = () => {
    const { profile } = useAuth();
    const { username } = profile || {};
    

    return (
        <div>
            <h1>Profile</h1>
        </div>
    )
}

export default Profile