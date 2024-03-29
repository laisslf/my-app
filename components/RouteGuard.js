import { favoritesAtom } from "@/store";
import { searchHistoryAtom } from "@/store";
import { useAtom } from "jotai";
import { getFavourites } from "@/lib/userData";
import { getHistory } from "@/lib/userData";
import { useEffect, useState } from "react";
import {useRouter} from "next/router";
import { isAuthenticated } from '@/lib/authenticate';

const PUBLIC_PATHS = ['/login', '/', '/_error', '/register'];

export default function RouteGuard(props) {
    const router = useRouter();
    const [favoritesList, setFavoritesList] = useAtom(favoritesAtom);
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const [authorized, setAuthorized] = useState(false);
    async function updateAtoms(){
        setFavoritesList(await getFavourites());        
        setSearchHistory(await getHistory());
    }
    useEffect(() => {
        updateAtoms(); // eslint-disable-line react-hooks/exhaustive-deps
        // on initial load - run auth check
        authCheck(router.pathname); // eslint-disable-line react-hooks/exhaustive-deps
    
        // on route change complete - run auth check
        router.events.on('routeChangeComplete', authCheck); // eslint-disable-line react-hooks/exhaustive-deps
    
        // unsubscribe from events in useEffect return function
        return () => {
          router.events.off('routeChangeComplete', authCheck); // eslint-disable-line react-hooks/exhaustive-deps
        };
      }, []);
    
      function authCheck(url) {
        // redirect to login page if accessing a private page and not logged in
        const path = url.split('?')[0];
        if (!isAuthenticated() && !PUBLIC_PATHS.includes(path)) {
          setAuthorized(false);
          router.push('/login');
        } else {            
          setAuthorized(true);
        }
      }
    return <>{authorized && props.children}</>
}