export default function checkResponse(resp: Response) {
    if (resp.ok) {
        return resp.json();
    }
    return Promise.reject(resp.status);
}