import create from 'zustand';
import { persist } from 'zustand/middleware';

const useUserStore = create(
  persist(
    (set, get) => ({
      username: localStorage.getItem('username') || null,
      setUsername: (username) => {
        if(typeof username === 'string') {
          set({ username });
        }
        else {
            console.log('username is not a string');
        }
      },
      getImmutableUsername: () => {
        return get().username;
      }
    }),
    {
      name: 'auth-storage', 
      onError : (error) => {
        console.log('There was an error in persist middleware', error);
      } 
    }
  )
);

export default useUserStore;
