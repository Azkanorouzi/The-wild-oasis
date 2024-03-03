import supabase from "./supabase";

export async function login({email, password}) {
    let {data, error} = await supabase.auth.signInWithPassword({
        email,
        password
    })

    if (error) throw new Error(error.message);
    console.log(data);
    return data;
}

export async function getCurrentUser() {
    const {data: session}  = await supabase.auth.getSession();
    if (!session.session) return null
    const {data, error} = await supabase.auth.getUser();
    console.log(data);
    if (error) throw new Error(error.message);
    return data.user;
}

export async function signup({fullName, email, password}) {
    console.log(fullName, email, password, 'asjlkdfslkdlksfdkl');
    console.log(password, 'this is the password')
    const {data, error} =    await supabase.auth.signUp({email, password, options: {
        data: {fullName, email, avatar: ''}
    }})

    if (error) throw new Error(error.message);
    return data;
}


export async function logout() {
    const {error} = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
}

export async function updateCurrentUser({password, fullName, email, avatar}) {
    

}