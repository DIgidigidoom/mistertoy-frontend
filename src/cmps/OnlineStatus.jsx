import { useOnlineStatus } from "../hooks/useOnlineStatus";

export function OnlineStatus(){
    const isOnline = useOnlineStatus()

    return <section className="online-status-container">
        <h1>{isOnline ? 'Online ✅'  : 'Offline ❌' }</h1>
    </section>

}