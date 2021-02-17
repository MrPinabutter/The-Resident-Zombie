import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useState} from 'react';

interface AuthContextData {
  registered: boolean;
  id: string;
  getData(): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {
  const [userID, setUserID] = useState<Object | null>(null)

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('USER_ID')
      if(value !== null) {
        setUserID(value);
      };
    } catch(e) {
      console.log(e);
    }
  } 


  return(
    <AuthContext.Provider value={{registered:!!userID, id: '', getData}}>
      {children}
    </AuthContext.Provider>
  )
};

export default AuthContext;


