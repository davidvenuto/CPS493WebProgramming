import type { DataEnvelope } from "./transportTypes";


export const API_ROOT = import.meta.env.VITE_API_ROOT;


export function rest(url: string, data?: unknown, method?: string, headers?: Record<string, string>){
    return fetch(url, {
        method: method ?? (data ? "POST" : "GET"),
        headers: {
            "Content-Type": "application/json",
            ...headers,
        },
        body: data ? JSON.stringify(data) : undefined,
    })
    .then(x => x.json())
}

export function api<T>(action: string, data?: unknown, method?: string): Promise<DataEnvelope<T>>{
    return rest(`${API_ROOT}/${action}`, data, method);
}

export function loadScript(url: string, id: string){
    return new Promise<any>((resolve, reject) => {
        if(document.getElementById(id)){
            resolve(null);
            return;
        }
        const script = document.createElement("script");
        script.src = url;
        script.id = id;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
    });
}