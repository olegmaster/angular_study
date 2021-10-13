import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Post, PostsService} from './posts.service';
import {User, UsersService} from './users.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    form: FormGroup;
    formAction = 'update';
    error = ''

    loading = false;

    posts: Post[] = [];
    users: User[] = [];

    constructor(private postService: PostsService, private userService: UsersService) {

    }

    ngOnInit() {
        this.fetchPosts();
        this.getUsers();

        this.form = new FormGroup({
            id: new FormControl(''),
            userId: new FormControl('', Validators.required),
            title: new FormControl('', Validators.required),
            body: new FormControl('', Validators.required)
        });
    }

    onSubmit() {
        if (this.form.valid) {
            console.log(this.form.get('id'));
            if (this.form.get('id').value !== '') {
                this.postService.updatePost(this.form.value).subscribe(response => {
                    console.log(typeof response)
                    this.posts = this.posts.map(el => {
                        if (el.id === this.form.get('id').value) {
                            el.userId = this.form.get('userId').value;
                            el.body = this.form.get('body').value;
                            el.title = this.form.get('title').value;
                            return el;
                        } else {
                            return el;
                        }
                    });
                    this.form.reset();
                });
            } else {
                this.postService.addPost(this.form.value).subscribe(response => {
                    this.posts.unshift(response);
                    this.form.reset();
                });
            }
        }
    }

    setAction(name: string) {
        if (['update', 'create'].includes(name)) {
            this.formAction = name;
        }
    }

    fetchPosts() {
        this.loading = true;
        this.postService.getPosts()
            .subscribe(response => {
                this.posts = response;
                this.loading = false;
            }, error => {
                this.error = error.message;
                console.log('watch error', error.message);
            });
    }

    getUsers() {
        this.loading = true;
        this.userService.getUsers()
            .subscribe(response => {
                this.users = response;
                this.loading = false;
            });
    }

    deletePost(id: number) {
        this.postService.deletePost(id)
            .subscribe(() => {
                this.posts = this.posts.filter(el => {
                    return el.id !== id;
                });
            });
    }

    setUpdatePostMode(id: number) {
        const post: Post = this.posts.filter(elem => {
            return elem.id === id;
        })[0]

        this.form.get('id').setValue(post.id);
        this.form.get('userId').setValue(post.userId);
        this.form.get('title').setValue(post.title);
        this.form.get('body').setValue(post.body);
    }
}

