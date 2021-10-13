import {Injectable} from '@angular/core';
import {HttpClient, HttpEventType, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {delay, map, tap} from 'rxjs/operators';

export interface Post {
    id: number;
    userId: number;
    title: string;
    body: string;
}

@Injectable({
    providedIn: 'root'
})
export class PostsService {

    constructor(private http: HttpClient) {
    }

    addPost(post: Post): Observable<Post> {
        const headers = new HttpHeaders({
            OlegCustomHeader: 'God 221',
            OneMoreCUstomHeader: 'Dsdsd2323'
        });
        return this.http.post<Post>('https://jsonplaceholder.typicode.com/posts/', post, {
            headers
        });
    }

    updatePost(post: Post): Observable<Post> {
        return this.http.put<Post>(`https://jsonplaceholder.typicode.com/posts/${post.id}`, post, {
            responseType: 'json'
        });
    }

    getPosts(): Observable<Post[]> {
        let params = new HttpParams();
        params = params.append('_limit', '2');
        params = params.append('olegs_pristashkin_param', 'Oleg is rich')

        return this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts', {
            // params: new HttpParams().set('_limit', '2'),
            params,
            observe: 'response'
        }).pipe(map(response => {
                console.log(response)
                return response.body;
            }
        ), delay(200));
    }

    deletePost(id: number) {
        return this.http.delete<void>(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            observe: 'events'
        }).pipe(tap(event => {
            if (event.type === HttpEventType.Sent) {
                console.log('Sent', event);
            }

            if (event.type === HttpEventType.Response) {
                console.log('Response', event);
            }
        }));
    }
}
