interface User {
  name: string
  email: string
}

export const addUserToLocalStorage = (user: User): void => {
   localStorage.setItem('user',JSON.stringify(user))
}

export const removeUserFromLocalStorage = (): void => {
   localStorage.removeItem('user')
}

export const getUserFromLocalStorage = (): User | null => {
    if (typeof window === 'undefined') return null
    // We get that item, the user one & we have two options
    // Either it is there or it is not there
   const result = localStorage.getItem('user') 
   if (!result) return null
   try {
    return JSON.parse(result) as User
     } catch {
   // Depending on thst result, if there is something there or it is undefined
   // If something is there, then we will pass the result
   // If nothing is there, then we will return null in the user
    return null
  }
}