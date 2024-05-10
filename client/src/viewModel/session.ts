import type { DataEnvelope } from "@/model/transportTypes";
import type { User } from "@/model/users";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import * as myFetch from "@/model/myFetch";
import { useToast } from "vue-toastification";

const session  = reactive({
    user: null as User | null,
    isLoading: 0,
});

export function useLogin() {
    const router = useRouter();
    return {
        async login(user: User) {
            const x = await api<User>("users/login", user);
            if(x){
                session.user = x.data;
                router.push("/");
            }
        },
        async googleLogin(){
            await myFetch.loadScript("https://accounts.google.com/gsi/client", "google-login");
            console.log({ client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID});
            const tokenClient = google.accounts.oauth2.initTokenClient({
              client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
              scope: "email profile",
              callback: async (response: any) => {
                console.log(response);
                const me = await myFetch.rest("https://people.googleapis.com/v1/people/me?personFields=emailAddresses,names,photos", undefined, "GET", {
                  Authorization: `Bearer ${response.access_token}`
                });
                console.log(me);
                const user: any = {
                  email: me.emailAddresses[0].value,
                  firstName: me.names[0].givenName,
                  lastName: me.names[0].familyName,
                  password: response.access_token,
                  image: me.photos[0].url,
                };
                session.user = user
              }
            });
            tokenClient.requestAccessToken({prompt: 'consent'});            
        },
        logout() {
            session.user = null;
            router.push("/login");
        }
    };
}

export const refSession = () => session;

export function api<T>(action: string, data?: unknown, method?: string){
    session.isLoading++;
    return myFetch.api<T>(action, data, method)
    .then(x=>{
        if(!x.isSuccess){
            showError(x);
        }
        return x;
    })
    .catch(showError)
    .finally(() => session.isLoading--);
}

const toast = useToast();
export function showError(error: any){
    console.error(error);
    toast.error(error.message || error);
}