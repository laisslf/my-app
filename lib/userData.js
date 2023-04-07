import { getToken } from "./authenticate";  



export async function addToFavourites(id) {   
  const myHeaders = new Headers({
    'Content-Type': 'application/json',
    'Authorization': `jwt ${getToken()}`
  });   
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`,  {
      method: 'PUT',      
      headers: myHeaders});
      const data = await res.json();

    if (res.status === 200) {      
      return data;
    } else {      
      return [];
    }
}

export async function removeFromFavourites(id) {  
  const myHeaders = new Headers({
    'Content-Type': 'application/json',
    'Authorization': `jwt ${getToken()}`
  });   
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`,  {
      method: 'DELETE',      
      headers: myHeaders});
      const data = await res.json();
    if (res.status === 200) {      
      return data;
    } else {      
      return [];
    }
}

export async function getFavourites() { 
    const myHeaders = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `jwt ${getToken()}`
    });   
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites`,  {
      method: 'GET',            
      headers: myHeaders});
      const data = await res.json();
    if (res.status === 200) {              
      return data;
    } else {      
      return [];
    }
  }

export async function addToHistory(id) {  
  const myHeaders = new Headers({
    'Content-Type': 'application/json',
    'Authorization': `jwt ${getToken()}`
  });   
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`,  {
      method: 'PUT',      
      headers: myHeaders});
      const data = await res.json();
    if (res.status === 200) {      
      return data;
    } else {      
      return [];
    }
  }

export async function removeFromHistory(id) {  
  const myHeaders = new Headers({
    'Content-Type': 'application/json',
    'Authorization': `jwt ${getToken()}`
  });   
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`,  {
      method: 'DELETE',      
      headers: myHeaders});
      const data = await res.json();
    if (res.status === 200) {      
      return data;
    } else {      
      return [];
    }
  }

export async function getHistory() {  
  const myHeaders = new Headers({
    'Content-Type': 'application/json',
    'Authorization': `jwt ${getToken()}`
  });   
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history`,  {
      method: 'GET', 
      headers: myHeaders});
      const data = await res.json();
    if (res.status === 200) {          
      return data;
    } else {      
      return [];
    }
  }
